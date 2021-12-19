<!--component for changing currency-->
<template>
  <div class="currency-select">
    <v-select
      :options="currenciesOptions"
      v-model="selectedCurrency"
      class="ir-style"
      :clearable="false"
      :searchable="true"
      :filterable="false"
  >
    <template v-slot:selected-option="option">
      <div class="vs__option">
        <span class="vs__icon" :class="option.icon"></span>
        <span class="vs__label">{{ option.label }}</span>
      </div>
    </template>
    <template v-slot:option="option">
      <div class="vs__option">
        <span class="vs__icon" :class="option.icon"></span>
        <span class="vs__label">{{ option.label }}</span>
      </div>
    </template>
  </v-select>
  </div>
</template>

<script>
import vSelect from "vue-select"
import {useActions} from "@/hooks";
import {onMounted, ref, watch} from "vue";
import {useStore} from "vuex";
import {currencies} from "@/resources";

export default {
  name: "CurrencySelect",
  setup() {
    const selectedCurrency = ref('usd');
    // getting currencies list
    const currenciesOptions = ref(currencies);

    const { setCurrency } = useActions(['setCurrency']);

    // watching for currency changes, when changes firing store action
    watch(selectedCurrency, value => {
      setCurrency(value?.value);
    })

    const store = useStore();

    onMounted(() => {
       // setting selected option for select depends on store state
       selectedCurrency.value = currencies.find(c => c.value === store.state.currency)
    })

    return {selectedCurrency, currenciesOptions}
  },
  components: {
    vSelect
  }
}
</script>