import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cart: [],
    quantity: 1,
    productId: '',
    cartData : []
}
const cartSlice = createSlice(
    {
        name: 'cart',
        initialState,
        reducers: {
            addToCart(state, action) {
                const { product, userId, quantity = 1 } = action.payload;
                let product_id = product._id
                console.log("product_id: ", product_id)
                let products = [
                    {
                        product: product._id,
                        quantity: quantity
                    }
                ]
                console.log("products: ", products)
                let data = axios.post("http://localhost:3000/cart/add-to-cart", { userId, products })
                    .then(res => { console.log("addTocart res: ", res) })
                    .catch(e => { console.log("error: ", e) })
                console.log("data in addtocart after api call: ", data)
            },
            async showCart(state, action) {
                const user_id = action.payload;
                console.log('userid in showcart', user_id)
                let { data }  = await axios.get(`http://localhost:3000/cart/getcart/${user_id}`)
                console.log(data);
                
            
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
        },
    }
)

export const { addToCart, setProductId, increment, decrement, showCart } = cartSlice.actions;
export default cartSlice.reducer;
