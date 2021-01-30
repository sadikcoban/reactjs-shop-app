import React, { Component } from 'react'

import "./sign-up.styles.scss"

import FormInput from "../form-input/form-input.component"
import CustomButton from "../custom-button/custom-button.component.jsx"
import { auth, createUserProfile } from "../../firebase/firebase.utils"

export default class SignUp extends Component {
    constructor() {
        super();

        this.state = {
            displayName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;

        if (password != confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            await createUserProfile(user, {displayName: displayName})

            this.setState({
                displayName: "",
                email: "",
                password: "",
                confirmPassword: ""
            });
        } catch (e) {
            console.log("error while signing up" + e.message)

        }
    }

    handleChange = (event) => {
        event.preventDefault();

        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className="dign-up">
                <h2>I don't have an account</h2>
                <span>Sign up with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        value={this.state.displayName}
                        handleChange={this.handleChange}
                        label="Name"
                        required
                    />

                    <FormInput
                        type="email"
                        name="email"
                        value={this.state.email}
                        handleChange={this.handleChange}
                        label="Email"
                        required
                    />
                    <FormInput
                        type="password"
                        name="password"
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label="Password"
                        required
                    />

                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        handleChange={this.handleChange}
                        label="Confirm Password"
                        required
                    />
                    <CustomButton type="submit">SIGN UP</CustomButton>
                </form>


            </div>
        )
    }
}
