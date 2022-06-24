import "./Logo.css"
import * as React from "react"
import { Link } from "react-router-dom";

export default function Logo() {
    return(
        <div className="logo">
            <Link to="/">
                <img className="logo-img" src="https://u7.uidownload.com/vector/336/32/vector-white-grocery-store-logo-vector-eps.jpg"></img>
            </Link>
        </div>
    )
}
// https://static.vecteezy.com/system/resources/previews/003/275/721/original/shopping-bag-store-logo-online-shopping-logo-design-free-vector.jpg
