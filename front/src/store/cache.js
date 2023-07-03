import { defineStore } from 'pinia'

export const useCacheStore = defineStore({
  id: 'mobile-cache', // id必填，且需要唯一
  state: () => {
    return {
      views: [],  // 视图缓存
    }
  },
  getters: {
    getViews: state => state.views,
  },
  actions: {
    addView(view) {
      if (this.views.includes(view.name)) return
      if (!view?.meta?.noCache) {
        this.views.push(view.name)
      }
    }
  }
})
