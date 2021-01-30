import React from 'react'
import { Link } from "react-router-dom"
import "./header.styles.scss"
import { auth } from "../../firebase/firebase.utils"
import CardIcon from "../cart-icon/cart-icon.component"
import CartDropdown from "../cart-dropdown/cart-dropdown.component"
import { connect } from "react-redux"


import { ReactComponent as Logo } from "../../assets/crown.svg.svg"

const Header = ({ currentUser, cart }) => {
    return (
        <div className="header">
            <Link className="logo-conainer" to="/">
                <Logo className="logo" />
            </Link>
            <div className="options">
                <Link className="option" to="/shop">SHOP</Link>
                <Link className="option" to="/contact">CONTACT</Link>
                {currentUser ?
                    <div className="option" onClick={() => auth.signOut()} >SIGN OUT</div> :
                    <Link className="option" to="/auth">SIGN IN</Link>}
                <CardIcon />
            </div>
            {
                cart ? null :
                <CartDropdown />
            }
        </div>
    )
}
const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    cart: state.cart.hidden,
})
export default connect(mapStateToProps)(Header)
