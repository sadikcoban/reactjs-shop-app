import CartActionTypes from "./cart.types"

export const toggleCardHidden = () => ({
    type: CartActionTypes.TOGGLE_CARD_HIDDEN,
})

export const addItem = (item) => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item,
})