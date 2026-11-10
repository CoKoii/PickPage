Page({
  data: {
    headerTopInset: 0,
    refreshing: false,
    openNoteId: '',
    openLevel: 0,
    listTitle: '全部笔记',
    quickActions: [
      { id: 'stats', title: '记录统计', icon: 'calendar-days-green', tone: 'green' },
      { id: 'tags', title: '标签', icon: 'map-pin-blue', tone: 'blue' },
      { id: 'collections', title: '小组件', icon: 'folder-purple', tone: 'purple' },
      { id: 'api', title: 'MCP & API', icon: 'code-xml-orange', tone: 'orange' },
    ],
    notes: [
      { id: 'n1', excerpt: '记录下今天的想法：如何让产品更有温度？', tag: '灵感', tagTone: 'green', source: '个人', time: '2026-11-07 14:30' },
      { id: 'n2', type: 'image', excerpt: '本周重点：用户增长、活动排期、技术迭代...', image: '/assets/note-images/desk.jpg', tag: '团队', tagTone: 'purple', source: '团队', time: '2026-11-06 18:20' },
      { id: 'n3', excerpt: '“真正重要的工作，往往很少……”', tag: '读书', tagTone: 'green', source: '摘录', time: '2026-11-06 16:50' },
      { id: 'n4', type: 'image', excerpt: '从功能到价值的路径思考', image: '/assets/note-images/workspace.jpg', tag: '工作', tagTone: 'blue', source: '团队', time: '2026-11-04 09:12' },
      { id: 'n5', excerpt: '用户更在意流程是否顺畅，而不是功能有多少。', translation: 'Users care more about a smooth experience than having many features.', type: 'voice', duration: '00:28', waveform: [13, 22, 30, 18, 26, 35, 20, 14, 28, 37, 24, 17, 31, 23, 12, 29, 36, 20, 15, 27, 33, 18, 24, 14], tag: '调研', tagTone: 'blue', source: '个人', time: '2026-11-03 16:40' },
      { id: 'n6', excerpt: '先解决信息层级，再讨论视觉细节。', tag: '会议', tagTone: 'purple', source: '团队', time: '2026-11-03 14:10' },
      { id: 'n7', excerpt: '短暂离开屏幕，回来时更容易看清问题。', tag: '随想', tagTone: 'green', source: '个人', time: '2026-11-02 20:25' },
      { id: 'n8', excerpt: '不只匹配关键词，也能找到相关的旧想法。', tag: '灵感', tagTone: 'green', source: '个人', time: '2026-11-02 17:08' },
      { id: 'n9', excerpt: '主色用于操作状态，中性色承担大部分界面。', tag: '设计', tagTone: 'blue', source: '团队', time: '2026-11-02 11:32' },
      { id: 'n10', excerpt: '把错误当作改进流程的反馈。', tag: '读书', tagTone: 'green', source: '摘录', time: '2026-11-01 21:16' },
      { id: 'n11', excerpt: '同步移动端排期，确认数据看板口径。', tag: '待办', tagTone: 'purple', source: '团队', time: '2026-11-01 15:42' },
      { id: 'n12', excerpt: '记录入口应该更直接，减少开始记录前的选择。', translation: 'Recording should start immediately, with fewer choices upfront.', type: 'voice', duration: '01:16', waveform: [20, 14, 31, 24, 17, 34, 26, 13, 19, 37, 28, 16, 23, 32, 18, 13, 29, 35, 21, 15, 27, 33, 18, 24], tag: '体验', tagTone: 'blue', source: '个人', time: '2026-11-01 10:05' },
      { id: 'n13', excerpt: '完成核心流程梳理，开始验证首屏信息密度。', tag: '周报', tagTone: 'purple', source: '团队', time: '2026-10-31 18:30' },
      { id: 'n14', excerpt: '哪些知识值得长期保存，哪些只需当下使用？', tag: '思考', tagTone: 'green', source: '个人', time: '2026-10-31 13:52' },
      { id: 'n15', excerpt: '成员希望快速分清私人记录和共享内容。', tag: '反馈', tagTone: 'blue', source: '团队', time: '2026-10-30 16:24' },
      { id: 'n16', excerpt: '整理书桌，读完手边这本书。', tag: '生活', tagTone: 'green', source: '个人', time: '2026-10-30 09:18' },
      { id: 'n17', excerpt: '打开后直接输入，分类和整理可以稍后完成。', tag: '设计', tagTone: 'blue', source: '个人', time: '2026-10-29 19:47' },
      { id: 'n18', excerpt: '拆小交付批次，让问题更早暴露。', tag: '复盘', tagTone: 'purple', source: '团队', time: '2026-10-29 15:03' },
      { id: 'n19', excerpt: '提出更好的问题，往往比更快地给出答案重要。', type: 'voice', duration: '00:42', waveform: [15, 27, 18, 32, 24, 14, 36, 22, 16, 29, 37, 20, 13, 26, 33, 17, 24, 35, 19, 14, 28, 31, 20, 12], tag: '摘录', tagTone: 'green', source: '摘录', time: '2026-10-29 08:56' },
      { id: 'n20', excerpt: '按主题关联记录，而不是依赖固定目录。', tag: '灵感', tagTone: 'green', source: '个人', time: '2026-10-28 17:21' },
      { id: 'n21', excerpt: '聚焦记录、检索和空间权限三个核心体验。', tag: '目标', tagTone: 'purple', source: '团队', time: '2026-10-28 11:36' },
      { id: 'n22', excerpt: '把零散的想法写下来，之后更容易找到联系。', tag: '随想', tagTone: 'green', source: '个人', time: '2026-10-27 08:42' },
    ],
  },
  onLoad() {
    const systemInfo = wx.getSystemInfoSync()
    const menuRect = wx.getMenuButtonBoundingClientRect()
    const statusBarHeight = systemInfo.statusBarHeight || 0
    const topInset = menuRect
      ? Math.max(statusBarHeight, menuRect.top + (menuRect.height - 39) / 2)
      : statusBarHeight + 8
    this.setData({ headerTopInset: topInset })
  },
  onPullDownRefresh() {
    if (this.data.refreshing) return
    this.setData({ refreshing: true })
    setTimeout(() => {
      this.setData({ refreshing: false })
    }, 600)
  },
  onNoteAction(event: WechatMiniprogram.CustomEvent) {
    const type = event.detail.type
    const id = event.detail.id
    const level = event.detail.level
    if (type === 'swipe') {
      const revealLevel = level || 0
      this.setData({ openNoteId: revealLevel ? id : '', openLevel: revealLevel })
      return
    }
    if (type === 'pin') {
      const notes = this.data.notes.map((note) => {
        if (note.id !== id) return note
        return Object.assign({}, note, { isPinned: !note.isPinned })
      })
      notes.sort((a, b) => Number(!!b.isPinned) - Number(!!a.isPinned))
      this.setData({ notes, openNoteId: '', openLevel: 0 })
      return
    }
    if (type === 'delete') {
      wx.showModal({
        title: '删除笔记',
        content: '确定删除这条笔记吗？',
        success: (result) => {
          if (!result.confirm) return
          this.setData({
            notes: this.data.notes.filter((note) => note.id !== id),
            openNoteId: '',
            openLevel: 0,
          })
        },
      })
    }
  },
  onQuickAction(event: WechatMiniprogram.TouchEvent) {
    wx.showToast({ title: `${event.currentTarget.dataset.title}即将开放`, icon: 'none' })
  },
  onFilter() { wx.showToast({ title: '筛选即将开放', icon: 'none' }) },
  onSort() { wx.showToast({ title: '排序即将开放', icon: 'none' }) },
})
