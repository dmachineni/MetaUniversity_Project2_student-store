import * as React from "react"
import "./NotFound.css"
import { useState} from "react"
import axios from 'axios'
import ProductView from "../ProductView/ProductView";
import{useParams} from "react-router-dom"
import { Link } from "react-router-dom";

export default function NotFound(props) {
    return(
        <div className="not-found">
            Not Found ....
        </div>
    )
}