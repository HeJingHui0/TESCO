// components/Tabs.js
Component({
  properties: {
    Tabs: {
      type: Array,
      value: []
    }
  },
  data: {

  },
  methods: {
    handleItemTap(e) {
      const {index} = e.currentTarget.dataset;
      this.triggerEvent("handleItemTap", {index})
    }
  }
})
