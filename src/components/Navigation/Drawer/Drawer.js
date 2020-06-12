import React, { Component } from 'react';
import classes from "./Drawer.module.css"
import { NavLink } from "react-router-dom"
import Backdrop from "../../UI/Backdrop/Backdrop"


const links = [
    { to: "/", label: "Список", exact: true, icon: "fa fa-list" },
    { to: "/auth", label: "Авторизация", exact: false, icon: "fa fa-sign-in" },
    { to: "/quiz-creator", label: "Создать тест", exact: false, icon: "fa fa-plus" }
]

class Drawer extends Component {

    clickHandler = () => {
        this.props.onClose()
    }

    renderLinks() {
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

        return (
            <React.Fragment>
                <nav className={cls.join(" ")}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
            </React.Fragment>
        )
    }
}

export default Drawer