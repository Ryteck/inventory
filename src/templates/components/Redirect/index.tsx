import React from "react";
import {Redirect} from "react-router-dom";

interface RedirectPropsInterface {
    render: boolean,
    path: string
}

export default ({render, path}: RedirectPropsInterface) => render? <Redirect to={path}/>: null
