<template>
  <div class="live-price">
    <div>
      <h4>Live Price</h4>
      <div v-if="currentTab === 'buy'" class="price">
        1 BTC / <span>{{ formattedOfferPrice }}</span> {{ currency }}
      </div>
      <div v-else-if="currentTab === 'sell'" class="price">
        1 BTC / <span>{{ formattedBidPrice }}</span> {{ currency }}
      </div>
    </div>
  </div>
</template>

<script>
import {useState} from "@/hooks";
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import {useStore} from "vuex";
import {Timer} from "@/helpers";

export default {
  name: "LivePrice",
  props: {
    tab: {
      type: String
    }
  },
  setup(props) {
    const {isLoading, bidPrice, offerPrice, currency} = useState(['isLoading', 'bidPrice', 'offerPrice', 'currency'])
    const store = useStore();

    // getting price function
    const getPrices = (currency) => { store.dispatch('getPrices', currency); }
    const priceInterval = new Timer(() => { getPrices(currency.value) }, 15000);

    onMounted(() => {
      // on component mounted event fires starts interval and getting prices first time
      getPrices(currency.value);
      priceInterval.start();
    });

    onUnmounted(() => {
      priceInterval.stop();
    });

    watch(currency, value => {
      // when currency changed - reset interval
      getPrices(value);
      priceInterval.reset();
    })

    // formatting prices
    const formattedOfferPrice = computed(() => {
      return (+offerPrice.value).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    });

    const formattedBidPrice = computed(() => {
      return (+bidPrice.value).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    });

    const currentTab = ref(props.tab)
    return {isLoading, bidPrice, offerPrice, currency, currentTab, formattedOfferPrice, formattedBidPrice}
  }
}
</script>

<style lang="scss" scoped>
  .live-price {
    margin-bottom: 25px;
  }
  h4 {
    font-size: 14px;
    margin-bottom: 5px;
  }

  .price {
    font-size: 15px;
    text-transform: uppercase;

    span {
      font-weight: 900;
    }
  }

  .loading {
    height: 39px;
  }
</style>