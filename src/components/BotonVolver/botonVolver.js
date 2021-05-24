import React from 'react'
import { Link } from 'react-router-dom';
import {ArrowLeftCircleFill} from "react-bootstrap-icons";

export default function botonVolver() {
    return (
        <div className="mr-2">
            <Link to={"/"} 
            className="text-decoration-none btn-volver"
            >
            <ArrowLeftCircleFill fill="black" fontSize="2rem"></ArrowLeftCircleFill>
            </Link>

        </div>
    );
}