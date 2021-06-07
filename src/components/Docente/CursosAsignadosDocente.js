import React from 'react'
import NavDocente from './NavDocente'
import Sidebar from '../Sidebar';
import TabMenu from './TabMenu';
import BotonVolver from '../BotonVolver/botonVolver';
import { SidebarDataDocente } from '../sideBar/SidebarDataDocente';

export default function CursosAsignadosDocente({ match }) {
    const idCurso = match.params;
    return (
        <div>
            <NavDocente></NavDocente>
            <div className="d-flex mt-1">
                <Sidebar data={SidebarDataDocente} />
                <div className="container cardContainer ">
                    <div>
                        <div className="w-100 d-flex justify-content-center mb-4">
                            <BotonVolver ruta="/rol"></BotonVolver>
                            <h3 className="m-0 p-0 color-docente borde-docente">{match.params.inst} - {match.params.curso}</h3>
                            <hr className="hr-colorDoc" />
                        </div>
                        <TabMenu curso={idCurso} />
                    </div>
                </div>
            </div>
        </div>
    );

}