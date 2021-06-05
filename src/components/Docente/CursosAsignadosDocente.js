import React from 'react'
import NavDocente from './NavDocente'
import { Link } from 'react-router-dom';
import {ArrowLeftCircleFill} from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import Sidebar from './Sidebar';
import TabMenu from './TabMenu';


export default function CursosAsignadosDocente({ match }) {
    const history = useHistory();
    
    return (
        <div>
            <NavDocente></NavDocente>
            <div className="d-flex mt-1">
            <Sidebar />
            <div className="container cardContainer ">
                <div>
                <Button onClick={() => {
                    history.goBack();
                }} 
            className="text-decoration-none btn-volver"
            >
            <ArrowLeftCircleFill fill="black" fontSize="2rem"></ArrowLeftCircleFill>
            </Button> <h2 className="font-weight-bold colorDoc">{match.params.inst} - {match.params.id}</h2>
                    <hr className="hr-colorDoc" />
                    <TabMenu />
                </div>
            </div>
        </div>
        </div>
    );

}