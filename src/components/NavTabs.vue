<template>
  <div class="nav">
    <button
        v-for="t in tabs"
        class="nav__tab"
        :class="{ active: selectedTab===t.key}"
        :key="t.key"
        @click="this.$emit('changeTab', t.key)"
    >
      {{ t.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: "NavTabs",
  props: ['tab'],
  data() {
    return {
      tabs: [
        {
          key: 'buy',
          label: 'Buy'
        },
        {
          key: 'sell',
          label: 'Sell'
        }
      ]
    }
  },
  computed: {
    selectedTab() {
      return this.tab
    }
  }
}
</script>
