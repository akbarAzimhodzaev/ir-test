<template>
  <div class="tab--sell">
    <LivePrice :tab="'sell'" />

    <div class="form__field">
      <label class="form__label" for="sell-sell">You sell</label>

      <div class="form__group">
        <span class="group__label">
          <span class="currency-icon btc" />
          <span class="currency-label">btc</span>
        </span>
        <input class="form__control" id="sell-sell" type="number" :value="sell" @input="handleSellInput" />
      </div>
    </div>

    <div class="form__field">
      <label class="form__label" for="sell-receive">You receive</label>

      <div class="form__group">
        <span class="group__label">
          <span class="currency-icon" :class="currency" />
          <span class="currency-label">{{ currency || 'USD' }}</span>
        </span>
        <input class="form__control" id="sell-receive" type="number" :value="receive" @input="handleReceiveInput" />
      </div>
    </div>

    <div class="form__actions">
      <button class="form__button" @click="handleSell" :disabled="sell === 0">Sell</button>
    </div>
  </div>
</template>

<script>
import LivePrice from "@/components/LivePrice";
import {useState} from "@/hooks";
import {ref, watch} from "vue";
import {useRouter} from "vue-router";
export default {
  name: "TabSell",
  setup() {
    const {currency, bidPrice} = useState(['currency', 'bidPrice'])
    const sell = ref(0)
    const receive = ref(0);

    const handleSellInput = (e) => {
      sell.value = +e.target.value
      receive.value = (+sell.value * +bidPrice.value).toFixed(2)
    }

    const handleReceiveInput = (e) => {
      receive.value = +e.target.value
      sell.value = (+receive.value / +bidPrice.value).toFixed(6)
    }

    watch(bidPrice, (newValue) => {
      receive.value = sell.value ? (+sell.value * +newValue).toFixed(2) : 0
    })

    const router = useRouter()

    const handleSell = () => {
      router.push({
        name: 'success',
        params: { message: `You sold ${sell.value} Bitcoin for ${receive.value} ${currency.value.toUpperCase()}!` }
      });
    }

    return {currency, handleSellInput, handleReceiveInput, sell, receive, handleSell}
  },
  components: {LivePrice}
}
</script>