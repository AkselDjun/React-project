import React, { Component } from 'react';
import classes from "./Drawer.module.css"
import { NavLink } from "react-router-dom"
import Backdrop from "../../UI/Backdrop/Backdrop"
import logo from "../../../logo.png"



class Drawer extends Component {

    clickHandler = () => {
        this.props.onClose()
    }

    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li ley={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.clickHandler}
                    >
                        {link.label}
                        <i
                            className={link.icon}
                        />
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        const cls = [classes.Drawer]

        if (!this.props.isOpen) {
            cls.push(classes.close)
        }

        const links = [
            { to: "/", label: "Список", exact: true, icon: "fa fa-list" }
        ]

        if (this.props.isAuthenticated) {
            links.push(
                { to: "/quiz-creator", label: "Создать тест", exact: false, icon: "fa fa-plus" },
                { to: "/logout", label: "Выйти", exact: false, icon: "fa fa-sign-out" },
            )
        } else {
            links.push(
                { to: "/auth", label: "Авторизация", exact: false, icon: "fa fa-sign-in" },
            )
        }

        return (
            <React.Fragment>
                <nav className={cls.join(" ")}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                    <img
                        src={logo}
                        className={classes.logo}
                        alt={"logo"}
                    />
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
            </React.Fragment>
        )
    }
}

export default Drawer