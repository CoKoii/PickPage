Component({
  properties: { value: { type: String, value: 'personal' } },
  methods: { onChange(event: WechatMiniprogram.CustomEvent) { this.triggerEvent('change', { value: event.currentTarget.dataset.value }) } },
})
