Component({
  properties: {
    title: { type: String, value: '' },
  },
  methods: {
    onFilter() { this.triggerEvent('filter') },
    onSort() { this.triggerEvent('sort') },
  },
})
