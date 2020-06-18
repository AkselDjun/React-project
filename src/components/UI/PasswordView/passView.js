import React from 'react';
import classes from "./passView.module.css"

const Pass = (props) => {
    const cls = [
        classes.passView,
        "fa"
    ]

    if (props.isOpenEye) {
        cls.push("fa-eye")
    } else {
        cls.push("fa-eye-slash")
    }

    return (
        <i
            className={cls.join(" ")}
            onClick={props.onToggleEye}
        />
    )
}

export default Pass