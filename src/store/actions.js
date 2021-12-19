import axios from "axios";

export default {
    async getPrices(ctx, currency = 'usd') {
        ctx.commit('setLoading', true)
        const res = await axios.get(`https://proxy.independentreserve.com/Public/GetMarketSummary?primaryCurrencyCode=xbt&secondaryCurrencyCode=${currency}`)
        ctx.commit('setLoading', false)
        const { CurrentHighestBidPrice, CurrentLowestOfferPrice } = res.data;
        ctx.commit('setBidPrice', CurrentHighestBidPrice)
        ctx.commit('setOfferPrice', CurrentLowestOfferPrice)
    },
    setCurrency(ctx, payload) {
        localStorage.setItem('ir_currency', payload);
        ctx.commit('setCurrency', payload);
    }
}