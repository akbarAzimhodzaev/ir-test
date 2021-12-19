export default {
    setLoading(state, payload) {
        state.isLoading = payload
    },
    setBidPrice(state, payload) {
        state.bidPrice = payload
    },
    setOfferPrice(state, payload) {
        state.offerPrice = payload
    },
    setCurrency(state, payload) {
        state.currency = payload
    }
}