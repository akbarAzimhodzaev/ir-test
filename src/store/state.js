// initial state
let initialCurr = localStorage.getItem('ir_currency');
if (!initialCurr) {
    localStorage.setItem('ir_currency', 'usd');
    initialCurr = 'usd';
}

export default {
    isLoading: false,
    currency: initialCurr,
    bidPrice: null,
    offerPrice: null
}