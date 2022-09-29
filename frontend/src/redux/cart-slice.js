import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    quantity: 0,
    productId: '',
}
const cartSlice = createSlice(
    {
        name: 'cart',
        initialState,
        reducers: {
            addToCart(state, action) {
                console.log(action.payload);
                state.cart.push(action.payload)
            },
            setProductId(state, action) {
                state.productId = action.payload;
            },
            increment(state) {
                state.quantity += 1;
            },
            decrement(state) {
                if (state.quantity <= 0)
                    state.quantity = 0;
                else
                    state.quantity -= 1;
            },


        }
    }
)

export const { addToCart, setProductId, increment, decrement } = cartSlice.actions;
export default cartSlice.reducer;
