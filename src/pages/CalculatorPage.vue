<template>
  <div class="body">
    <CurrencySelect />
    <Calculator />
  </div>
</template>

<script>
import CurrencySelect from '@/components/CurrencySelect.vue'
import Calculator from "@/components/Calculator";

export default {
  name: 'CalculatorPage',
  components: {
    CurrencySelect, Calculator
  }
}
</script>

<style scoped>

</style>