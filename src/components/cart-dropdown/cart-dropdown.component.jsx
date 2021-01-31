import React from 'react'
import { connect } from "react-redux"


import CustomButton from "../custom-button/custom-button.component"
import "./cart-dropdown.styles.scss"
import CartItem from "../cart-item/cart-item.component"
const CartDropdown = ({ cartItems }) => {
    return (
        <div className="cart-dropdown">
            <div className="cart-items">
                {cartItems.map(i => <CartItem key={i.id} item={i} />)}
            </div>
            <CustomButton>GO TO CHECKOUT</CustomButton>

        </div>
    )
}

const mapStateToProps = (state) => ({
    cartItems: state.cart.cartItems
})

export default connect(mapStateToProps, null)(CartDropdown)
