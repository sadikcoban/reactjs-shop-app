import CartActionTypes from "./cart.types"

const INITIAL_STATE = {
    hidden: false
};

const cartReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case CartActionTypes.TOGGLE_CARD_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            };
        default:
            return state;
    }
};

export default cartReducer;