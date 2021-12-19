<template>
  <div class="calculator">
    <NavTabs :tab="selectedTab" @changeTab="changeTabHandler" />
    <div class="tab-content">
      <!-- Block UI to prevent user actions in loading state-->
      <div class="tabs__loading" v-if="isLoading">Loading data...</div>
      <div class="tab__tabs">
        <TabBuy v-show="selectedTab === 'buy'" />
        <TabSell v-show="selectedTab === 'sell'" />
      </div>
    </div>
  </div>
</template>

<script>
import TabBuy from "@/components/TabBuy";
import TabSell from "@/components/TabSell";
import NavTabs from "@/components/NavTabs";
import {ref} from "vue";
import {useState} from "@/hooks";

export default {
  name: "Calculator",
  components: {
    TabBuy, TabSell, NavTabs
  },
  setup() {
    const selectedTab = ref('buy');
    const { isLoading } = useState(['isLoading']);
    const changeTabHandler = (tab) => {
      selectedTab.value = tab
    }
    return {selectedTab, changeTabHandler, isLoading}
  }
}
</script>