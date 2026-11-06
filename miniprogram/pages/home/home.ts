Page({
  data: {
    headerTopInset: 0,
    refreshing: false,
    openNoteId: '',
    openLevel: 0,
    activeSpace: 'personal',
    listTitle: '全部笔记',
    quickActions: [
      { id: 'stats', title: '记录统计', icon: 'calendar-days' },
      { id: 'tags', title: '标签', icon: 'map-pin' },
      { id: 'collections', title: '小组件', icon: 'folder' },
      { id: 'api', title: 'MCP & API', icon: 'code-xml' },
    ],
    notes: [
      { id: 'n1', title: '把思考变成行动：第一步是记录', excerpt: '记录下今天的想法：如何让产品更有温度？', tag: '灵感', tagTone: 'green', source: '个人', time: '今天 14:30', cover: '/assets/covers/idea.jpg' },
      { id: 'n2', title: '团队周会要点整理', excerpt: '本周重点：用户增长、活动排期、技术迭代...', tag: '团队', tagTone: 'purple', source: '团队', time: '昨天 18:20', cover: '/assets/covers/team.jpg' },
      { id: 'n3', title: '《深度工作》摘录', excerpt: '“真正重要的工作，往往很少……”', tag: '读书', tagTone: 'green', source: '摘录', time: '昨天 16:50', cover: '/assets/covers/reading.jpg' },
      { id: 'n4', title: '下季度的产品 roadmap', excerpt: '从功能到价值的路径思考', tag: '工作', tagTone: 'blue', source: '团队', time: '周二 09:12', cover: '/assets/covers/roadmap.jpg' },
      { id: 'n5', title: '用户访谈中的三个发现', excerpt: '用户更在意流程是否顺畅，而不是功能有多少。', type: 'voice', duration: '00:28', waveform: [13, 22, 30, 18, 26, 35, 20, 14, 28, 37, 24, 17, 31, 23, 12, 29, 36, 20, 15, 27, 33, 18, 24, 14], tag: '调研', tagTone: 'blue', source: '个人', time: '周一 16:40' },
      { id: 'n6', title: '会议：新版首页评审', excerpt: '先解决信息层级，再讨论视觉细节。', tag: '会议', tagTone: 'purple', source: '团队', time: '周一 14:10', cover: '/assets/covers/team.jpg' },
      { id: 'n7', title: '关于专注与休息', excerpt: '短暂离开屏幕，回来时更容易看清问题。', tag: '随想', tagTone: 'green', source: '个人', time: '周日 20:25', cover: '/assets/covers/reading.jpg' },
      { id: 'n8', title: '灵感：让搜索理解上下文', excerpt: '不只匹配关键词，也能找到相关的旧想法。', tag: '灵感', tagTone: 'green', source: '个人', time: '周日 17:08', cover: '/assets/covers/idea.jpg' },
      { id: 'n9', title: '设计系统颜色规范', excerpt: '主色用于操作状态，中性色承担大部分界面。', tag: '设计', tagTone: 'blue', source: '团队', time: '周日 11:32', cover: '/assets/covers/roadmap.jpg' },
      { id: 'n10', title: '《原则》阅读摘记', excerpt: '把错误当作改进流程的反馈。', tag: '读书', tagTone: 'green', source: '摘录', time: '周六 21:16', cover: '/assets/covers/reading.jpg' },
      { id: 'n11', title: '本周待确认事项', excerpt: '同步移动端排期，确认数据看板口径。', tag: '待办', tagTone: 'purple', source: '团队', time: '周六 15:42', cover: '/assets/covers/team.jpg' },
      { id: 'n12', title: '第一次使用体验记录', excerpt: '记录入口应该更直接，减少开始记录前的选择。', type: 'voice', duration: '01:16', waveform: [20, 14, 31, 24, 17, 34, 26, 13, 19, 37, 28, 16, 23, 32, 18, 13, 29, 35, 21, 15, 27, 33, 18, 24], tag: '体验', tagTone: 'blue', source: '个人', time: '周六 10:05' },
      { id: 'n13', title: '产品周报：迭代进展', excerpt: '完成核心流程梳理，开始验证首屏信息密度。', tag: '周报', tagTone: 'purple', source: '团队', time: '周五 18:30', cover: '/assets/covers/roadmap.jpg' },
      { id: 'n14', title: '读书时想到的问题', excerpt: '哪些知识值得长期保存，哪些只需当下使用？', tag: '思考', tagTone: 'green', source: '个人', time: '周五 13:52', cover: '/assets/covers/reading.jpg' },
      { id: 'n15', title: '客户反馈：协作空间', excerpt: '成员希望快速分清私人记录和共享内容。', tag: '反馈', tagTone: 'blue', source: '团队', time: '周四 16:24', cover: '/assets/covers/team.jpg' },
      { id: 'n16', title: '周末想做的事', excerpt: '整理书桌，读完手边这本书。', tag: '生活', tagTone: 'green', source: '个人', time: '周四 09:18', cover: '/assets/covers/reading.jpg' },
      { id: 'n17', title: '快速记录的交互草稿', excerpt: '打开后直接输入，分类和整理可以稍后完成。', tag: '设计', tagTone: 'blue', source: '个人', time: '周三 19:47', cover: '/assets/covers/idea.jpg' },
      { id: 'n18', title: '迭代复盘：减少等待', excerpt: '拆小交付批次，让问题更早暴露。', tag: '复盘', tagTone: 'purple', source: '团队', time: '周三 15:03', cover: '/assets/covers/roadmap.jpg' },
      { id: 'n19', title: '摘录：保持好奇', excerpt: '提出更好的问题，往往比更快地给出答案重要。', type: 'voice', duration: '00:42', waveform: [15, 27, 18, 32, 24, 14, 36, 22, 16, 29, 37, 20, 13, 26, 33, 17, 24, 35, 19, 14, 28, 31, 20, 12], tag: '摘录', tagTone: 'green', source: '摘录', time: '周三 08:56' },
      { id: 'n20', title: '灵感库的整理方式', excerpt: '按主题关联记录，而不是依赖固定目录。', tag: '灵感', tagTone: 'green', source: '个人', time: '周二 17:21', cover: '/assets/covers/idea.jpg' },
      { id: 'n21', title: '团队同步：本月目标', excerpt: '聚焦记录、检索和空间权限三个核心体验。', tag: '目标', tagTone: 'purple', source: '团队', time: '周二 11:36', cover: '/assets/covers/team.jpg' },
      { id: 'n22', title: '今天的一点观察', excerpt: '把零散的想法写下来，之后更容易找到联系。', tag: '随想', tagTone: 'green', source: '个人', time: '周一 08:42', cover: '/assets/covers/reading.jpg' },
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
  onSpaceChange(event: WechatMiniprogram.CustomEvent) {
    const value = event.detail.value
    this.setData({ activeSpace: value, listTitle: value === 'personal' ? '全部笔记' : '团队笔记' })
  },
  onQuickAction(event: WechatMiniprogram.TouchEvent) {
    wx.showToast({ title: `${event.currentTarget.dataset.title}即将开放`, icon: 'none' })
  },
  onFilter() { wx.showToast({ title: '筛选即将开放', icon: 'none' }) },
  onSort() { wx.showToast({ title: '排序即将开放', icon: 'none' }) },
})
