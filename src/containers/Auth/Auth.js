import React, { Component } from 'react';
import classes from "./Auth.module.css"
import Button from "../../components/UI/Button/Button"
import Input from "../../components/UI/Input/Input"
import Pass from "../../components/UI/PasswordView/passView"
import is from "is_js"
import { connect } from 'react-redux';
import { auth } from '../../store/actions/auth';


class Auth extends Component {

    state = {
        eye: false,
        isFormValid: false,
        formControls: {
            email: {
                value: "",
                type: "email",
                label: "Email",
                errorMessage: "Введите корректный Email",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: "",
                type: "password",
                label: "Пароль",
                errorMessage: "Введите корректный пароль",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 9
                }
            }
        }
    }

    loginHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )
    }

    registerHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )

    }

    submitHandler = event => {
        event.preventDefault()
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== "" && isValid
        }

        if (validation.email) {
            isValid = is.email(value) && isValid
        }

        if (validation.minLength) {
            isValid  = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    toggleEyeHandler = () => {
        this.setState({
            eye: !this.state.eye
        })
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>

                        <div className={classes.formRegAuth}>
                            <h2>Sign In</h2>
                            <h2>Sign Up</h2>
                        </div>

                        {this.renderInputs()}
                        <Pass
                            onToggleEye={this.toggleEyeHandler}
                            isOpenEye={this.state.eye}
                        />


                        <div className={classes.formBtn}>
                            <Button
                                type="success"
                                onClick={this.loginHandler}
                                disabled={!this.state.isFormValid}
                            >
                                Войти
                            </Button>
                            <Button
                                type="primary"
                                onClick={this.registerHandler}
                                disabled={!this.state.isFormValid}
                            >
                                Зарегистрироваться
                            </Button>
                        </div>
                    </form>

                    {/* <form onSubmit={this.submitHandler} className={classes.AuthForm}>

                        <div className={classes.formRegAuth}>
                            <h2>Sign In</h2>
                            <h2>Sign Up</h2>
                        </div>

                        {this.renderInputs()}

                        <div className={classes.formBtn}>
                            <Button
                                type="primary"
                                onClick={this.registerHandler}
                                disabled={!this.state.isFormValid}
                            >
                                Зарегистрироваться
                            </Button>
                        </div>
                    </form> */}
                </div>
            </div >
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth)