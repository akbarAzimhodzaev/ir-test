<template>
  <div class="tab--buy">
    <LivePrice :tab="'buy'" />

    <div class="form__field">
      <label class="form__label" for="buy-pay">You pay</label>

      <div class="form__group">
        <span class="group__label">
          <span class="currency-icon" :class="currency" />
          <span class="currency-label">{{ currency || 'USD' }}</span>
        </span>
        <input class="form__control" id="buy-pay" type="number" :value="pay" @input="handlePayInput" />
      </div>
    </div>

    <div class="form__field">
      <label class="form__label" for="buy-receive">You receive</label>

      <div class="form__group">
        <span class="group__label">
          <span class="currency-icon btc" />
          <span class="currency-label">btc</span>
        </span>
        <input class="form__control" id="buy-receive" type="number" :value="receive" @input="handleReceiveInput" />
      </div>
    </div>

    <div class="form__actions">
      <button class="form__button" :disabled="pay === 0" @click="handleBuy">Buy</button>
    </div>
  </div>
</template>

<script>
import LivePrice from "@/components/LivePrice";
import {useState} from "@/hooks";
import {ref, watch} from "vue";
import {useRouter} from "vue-router";
export default {
  name: "TabBuy",
  setup() {
    const {currency, offerPrice} = useState(['currency', 'offerPrice'])
    const pay = ref(0)
    const receive = ref(0);

    const handlePayInput = (e) => {
      pay.value = +e.target.value
      receive.value = (+pay.value / +offerPrice.value).toFixed(6)
    }

    const handleReceiveInput = (e) => {
      receive.value = +e.target.value
      pay.value = ((+receive.value) * (+offerPrice.value)).toFixed(2)
    }

    watch(offerPrice, (newValue) => {
      receive.value = pay.value ? (+pay.value / +newValue).toFixed(6) : 0
    })

    const router = useRouter()

    const handleBuy = () => {
      router.push({
        name: 'success',
        params: { message: `You bought ${receive.value} Bitcoin for ${pay.value} ${currency.value.toUpperCase()}!` }
      });
    }

    return {
      currency,
      handlePayInput,
      handleReceiveInput,
      pay,
      receive,
      handleBuy
    }
  },
  components: {LivePrice}
}
</script>