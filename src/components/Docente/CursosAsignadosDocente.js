import React from 'react'
import NavDocente from './NavDocente'
import Sidebar from '../Sidebar';
import TabMenu from './TabMenu';
import BotonVolver from '../BotonVolver/botonVolver';
import { SidebarDataDocente } from '../sideBar/SidebarDataDocente';
import { ArrowLeftCircleFill } from 'react-bootstrap-icons';

export default function CursosAsignadosDocente({ cursoId,cursoNombre, institucionNombre, institucionId, setearClick }) {
    return (
        <div>
            {/*<NavDocente></NavDocente>
            <div className="d-flex mt-1">
                <Sidebar data={SidebarDataDocente} />
                <div className="container cardContainer ">*/}
                    <div>
                        <div className="w-100 d-flex justify-content-center mb-4">
                            <a href="#">                              
                               <ArrowLeftCircleFill fill="black" fontSize="2rem"  
                                onClick={()=>setearClick(false)}>
                                </ArrowLeftCircleFill> 
                            </a> 
                            <h3 className="m-0 p-0 color-docente borde-docente">{institucionNombre} - {cursoNombre}</h3>
                            <hr className="hr-colorDoc" />
                        </div>
                        <TabMenu curso={cursoId} institucion={institucionId}/>
                    </div>
                </div>
          
    );

}
 /*</div>
           </div>*/