const DEFAULT_MAX_REVEAL = 116
const RUBBER_BAND_POWER = 0.7
const ACTION_VISIBLE_START = 50
const ACTION_VISIBLE_END = 100
const EXPAND_THRESHOLD = 50
const TRIGGER_THRESHOLD = 280
const liveComponents = new WeakSet<object>()

type TouchPoint = { clientX?: number, clientY?: number, pageX?: number, pageY?: number }
const touchX = (touch: TouchPoint) => typeof touch.clientX === 'number' ? touch.clientX : (touch.pageX || 0)
const touchY = (touch: TouchPoint) => typeof touch.clientY === 'number' ? touch.clientY : (touch.pageY || 0)
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

// Card and rail are the only animated geometry. All children use CSS layout.
const motion = (reveal: number, maxReveal: number) => ({
  translateX: -reveal,
  railWidth: Math.max(maxReveal, reveal),
  actionOpacity: clamp((reveal - ACTION_VISIBLE_START) / (ACTION_VISIBLE_END - ACTION_VISIBLE_START), 0, 1),
})

Component({
  properties: {
    note: { type: Object, value: {} },
    revealLevel: {
      type: Number,
      value: 0,
      observer(level: number) {
        const reveal = level > 0 ? this.data.maxReveal : 0
        if (-reveal === this.data.translateX && !this.data.dragging) return
        this.setData(Object.assign({ dragging: false, armed: false, dragAxis: '' }, motion(reveal, this.data.maxReveal)))
      },
    },
  },
  data: {
    translateX: 0,
    railWidth: DEFAULT_MAX_REVEAL,
    maxReveal: DEFAULT_MAX_REVEAL,
    actionOpacity: 0,
    dragging: false,
    armed: false,
    gestureMoved: false,
    startX: 0,
    startY: 0,
    startOffset: 0,
    lastX: 0,
    lastTime: 0,
    dragAxis: '',
  },
  lifetimes: {
    attached() { liveComponents.add(this) },
    ready() {
      const query = this.createSelectorQuery()
      query.select('.note-row').boundingClientRect()
      query.select('.note-action-rail').boundingClientRect()
      query.exec((rects) => {
        if (!liveComponents.has(this) || !Array.isArray(rects) || !rects[0] || !rects[1]) return
        const maxReveal = Math.max(0, rects[0].right - rects[1].left)
        const reveal = this.properties.revealLevel > 0 ? maxReveal : 0
        if (!this.data.dragging) this.setData(Object.assign({ maxReveal }, motion(reveal, maxReveal)))
      })
    },
    detached() { liveComponents.delete(this) },
  },
  methods: {
    noop() {},
    onTouchStart(event: WechatMiniprogram.TouchEvent) {
      const touch = event.touches && event.touches[0]
      if (!touch) return
      this.setData({
        startX: touchX(touch), startY: touchY(touch),
        startOffset: this.data.translateX,
        lastX: touchX(touch), lastTime: event.timeStamp || Date.now(),
        gestureMoved: false, dragAxis: '',
      })
    },
    onTouchMove(event: WechatMiniprogram.TouchEvent) {
      const touch = event.touches && event.touches[0]
      if (!touch) return
      const x = touchX(touch)
      const dx = x - this.data.startX
      const dy = touchY(touch) - this.data.startY
      let axis = this.data.dragAxis
      if (!axis && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
        axis = Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical'
      }
      if (axis !== 'horizontal') {
        if (axis !== this.data.dragAxis) this.setData({ dragAxis: axis, gestureMoved: true })
        return
      }
      const rawReveal = Math.max(0, -(this.data.startOffset + dx))
      const armed = rawReveal >= TRIGGER_THRESHOLD
      const excess = Math.max(0, rawReveal - TRIGGER_THRESHOLD)
      const reveal = excess ? TRIGGER_THRESHOLD + Math.pow(excess, RUBBER_BAND_POWER) : rawReveal
      if (armed && !this.data.armed) wx.vibrateShort({ type: 'light' })
      this.setData(Object.assign({
        dragAxis: axis, dragging: true, gestureMoved: true, armed,
        lastX: x, lastTime: event.timeStamp || Date.now(),
      }, motion(reveal, this.data.maxReveal)))
    },
    settle(level: number) {
      const target = level ? this.data.maxReveal : 0
      // Enable the shared transition before updating geometry; descendants resize with the rail.
      this.setData({ dragging: false, armed: false, dragAxis: '' }, () => {
        if (!liveComponents.has(this)) return
        this.setData(motion(target, this.data.maxReveal), () => {
          this.triggerEvent('action', { type: 'swipe', id: this.data.note.id, level })
        })
      })
    },
    onTouchEnd(event: WechatMiniprogram.TouchEvent) {
      if (this.data.dragAxis !== 'horizontal') {
        this.setData({ dragAxis: '' })
        return
      }
      const changed = event.changedTouches && event.changedTouches[0]
      const endX = changed ? touchX(changed) : this.data.lastX
      const rawReveal = Math.max(0, -(this.data.startOffset + endX - this.data.startX))
      // Velocity may choose an open/closed snap, but must never authorize deletion.
      if (this.data.armed && rawReveal >= TRIGGER_THRESHOLD) {
        this.setData(Object.assign({ dragging: false, armed: false, dragAxis: '' }, motion(0, this.data.maxReveal)), () => {
          this.triggerEvent('action', { type: 'delete', id: this.data.note.id })
        })
        return
      }
      const elapsed = Math.max(1, (event.timeStamp || Date.now()) - this.data.lastTime)
      const projectedReveal = Math.max(0, -this.data.translateX - (endX - this.data.lastX) / elapsed * 120)
      this.settle(projectedReveal >= EXPAND_THRESHOLD ? 1 : 0)
    },
    onTouchCancel() {
      if (this.data.dragAxis === 'horizontal') this.settle(this.properties.revealLevel > 0 ? 1 : 0)
      else this.setData({ dragAxis: '', armed: false })
    },
    onPinTap() {
      if (!this.data.gestureMoved) this.triggerEvent('action', { type: 'pin', id: this.data.note.id })
    },
    onDeleteTap() {
      if (!this.data.gestureMoved) this.triggerEvent('action', { type: 'delete', id: this.data.note.id })
    },
  },
})
