const DEFAULT_MAX_REVEAL = 116
const RESISTANCE_CAP = 8
const liveComponents = new WeakSet<object>()

type TouchEventWithPropagation = WechatMiniprogram.TouchEvent & {
  stopPropagation?: () => void
}

type ActionDirection = 'show' | 'hide'

const actionMotion = (reveal: number, direction: ActionDirection) => ({
  pinVisible: reveal >= (direction === 'show' ? 8 : 56),
  deleteVisible: reveal >= (direction === 'show' ? 60 : 108),
  pinDelay: direction === 'show' ? 40 : 180,
  deleteDelay: direction === 'show' ? 210 : 0,
})

Component({
  properties: {
    note: { type: Object, value: {} },
    revealLevel: {
      type: Number,
      value: 0,
      observer(level: number) {
        const reveal = level > 0 ? this.data.maxReveal : 0
        const target = -reveal
        const currentReveal = Math.max(0, -this.data.translateX)
        const direction = reveal > currentReveal ? 'show' : reveal < currentReveal ? 'hide' : this.data.actionDirection
        if (target === this.data.translateX && !this.data.dragging) return
        this.setData(Object.assign({ translateX: target, dragging: false, actionDirection: direction }, actionMotion(reveal, direction)))
      },
    },
  },
  data: {
    translateX: 0,
    dragging: false,
    actionDirection: 'show',
    pinVisible: false,
    deleteVisible: false,
    pinDelay: 40,
    deleteDelay: 210,
    startX: 0,
    startY: 0,
    startOffset: 0,
    dragAxis: '',
    maxReveal: DEFAULT_MAX_REVEAL,
  },
  lifetimes: {
    attached() {
      liveComponents.add(this)
    },
    ready() {
      const query = this.createSelectorQuery()
      query.select('.note-row').boundingClientRect()
      query.select('.note-action-rail').boundingClientRect()
      query.exec((rects) => {
        if (!liveComponents.has(this) || !Array.isArray(rects) || rects.length < 2) return
        const row = rects[0]
        const rail = rects[1]
        if (!row || !rail) return
        const maxReveal = Math.max(0, row.right - rail.left)
        const reveal = this.properties.revealLevel > 0 ? maxReveal : Math.max(0, -this.data.translateX)
        this.setData(Object.assign({ maxReveal, translateX: -reveal }, actionMotion(reveal, this.data.actionDirection)))
      })
    },
    detached() {
      liveComponents.delete(this)
    },
  },
  methods: {
    noop() {},
    onTouchStart(event: WechatMiniprogram.TouchEvent) {
      const touch = event.touches?.[0]
      if (!touch) return
      this.setData({
        startX: touch.clientX,
        startY: touch.clientY,
        startOffset: this.data.translateX,
        dragAxis: '',
      })
    },
    onTouchMove(event: TouchEventWithPropagation) {
      const touch = event.touches?.[0]
      if (!touch) return
      const dx = touch.clientX - this.data.startX
      const dy = touch.clientY - this.data.startY
      let axis = this.data.dragAxis
      if (!axis && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
        axis = Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical'
      }
      if (axis !== 'horizontal') {
        if (axis !== this.data.dragAxis) this.setData({ dragAxis: axis })
        return
      }
      event.stopPropagation?.()
      const rawReveal = Math.max(0, -(this.data.startOffset + dx))
      const maxReveal = this.data.maxReveal
      const resistedReveal = rawReveal <= maxReveal
        ? rawReveal
        : maxReveal + Math.min(RESISTANCE_CAP, (rawReveal - maxReveal) * 0.16)
      const currentReveal = Math.max(0, -this.data.translateX)
      const direction = resistedReveal > currentReveal
        ? 'show'
        : resistedReveal < currentReveal
          ? 'hide'
          : this.data.actionDirection
      this.setData(Object.assign({ dragAxis: axis, dragging: true, translateX: -resistedReveal, actionDirection: direction }, actionMotion(resistedReveal, direction)))
    },
    onTouchEnd() {
      if (this.data.dragAxis !== 'horizontal') {
        this.setData({ dragAxis: '' })
        return
      }
      const reveal = Math.max(0, -this.data.translateX)
      const level = reveal >= this.data.maxReveal / 2 ? 1 : 0
      const target = level ? this.data.maxReveal : 0
      const currentReveal = Math.max(0, -this.data.translateX)
      const direction = target > currentReveal
        ? 'show'
        : target < currentReveal
          ? 'hide'
          : this.data.actionDirection
      this.setData({ dragging: false, dragAxis: '', actionDirection: direction }, () => {
        this.setData(Object.assign({ translateX: -target }, actionMotion(target, direction)), () => {
          this.triggerEvent('action', { type: 'swipe', id: this.data.note.id, level })
        })
      })
    },
    onPinTap() {
      this.triggerEvent('action', { type: 'pin', id: this.data.note.id })
    },
    onDeleteTap() {
      this.triggerEvent('action', { type: 'delete', id: this.data.note.id })
    },
  },
})
