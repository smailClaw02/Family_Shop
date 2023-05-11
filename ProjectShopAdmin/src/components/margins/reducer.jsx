let initialeState = {
    products: []
};

const reducer = (state = initialeState, action) => {
    switch (action.type) {
        // Add : ======================== //
        case "ADD_PRODUCTS":
            return {...state, products: [...state.products, action.payload] }
        // Remove Cart : ================ //
        case "REMOVE_CART":
            return {...state, products: [] }
        // Remove product : ============ //
        case "REMOVE_PRODUCT":
            return {...state, products: [...state.products.filter(pro => pro.productId !== action.payload)] }

        default:
            return state
    }
}
export default reducer;