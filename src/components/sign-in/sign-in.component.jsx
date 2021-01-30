import React, { Component } from 'react'
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import "./sign-in.styles.scss"
import { signInWithGoogle, auth } from "../../firebase/firebase.utils.js"

export default class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ name: "", password: "" });
        } catch (e) {
            console.log(e.message);
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span className="title">Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit} >
                    <FormInput
                        name="email"
                        type="email"
                        value={this.state.email}
                        handleChange={this.handleChange}
                        label="Email"
                        required />
                    <FormInput
                        name="password"
                        type="password"
                        handleChange={this.handleChange}
                        value={this.state.password}
                        label="Password"
                        required />

                    <div className="buttons">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn >Sign In With Google</CustomButton></div>
                </form>

            </div>
        )
    }
}
