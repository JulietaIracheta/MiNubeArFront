import React, {useState, useEffect} from 'react'
import NavEstudiante from '../Estudiante/NavEstudiante'
import Sidebar from '../Sidebar'
import {SidebarDataEstudiante} from '../sideBar/SidebarDataEstudiante'
import { Cookies } from 'react-cookie';

import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
  withStyles
} from "@material-ui/core";

const Calificaciones = ({ classes, ...props }) => {
  const [boletin, setBoletin] = useState([]);
  const cookie = new Cookies();
  const jwt = cookie.get('jwt');
  
  useEffect(async () => {
    const result = await fetch('http://localhost:60671/api/boletin/estudiante/?jwt='+jwt, {
      method: 'GET',
      headers: { "Content-type": "application/json" },
      credentials: "include",
    }).then(function (response) {
      return response.json();
    })
      .then(response => {
        setBoletin(response)
      });
  }, [])
  
  return (
      <div>
        <NavEstudiante />
        <div className="d-flex">
          <Sidebar data={SidebarDataEstudiante}/>
          <main className="main w-100 pr-2 pt-4">
          <div>
            <span className="tituloadmin tituloEstudiante">Trayectoria Escolar</span>
          </div>
            <Table responsive className="mt-3 d-block d-sm-table bg-white table-responsive" style={{border:"1px solid #edf2f9"}}>
              <TableHead style={{backgroundColor:"rgba(182, 25, 21, .7)"}}>
                <TableRow>
                  <TableCell className="font-weight-bold text-white text-uppercase">Materia</TableCell>
                  <TableCell className="font-weight-bold text-white text-uppercase">Nota T1</TableCell>
                  <TableCell className="font-weight-bold text-white text-uppercase">Nota T2</TableCell>
                  <TableCell className="font-weight-bold text-white text-uppercase">Nota T3</TableCell>
                  <TableCell className="font-weight-bold text-white text-uppercase">Promedio</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {boletin.map((notas, index) => {
                var total=0;
                  if(notas.t1){
                    total=total+1;
                  }else{
                    notas.t1=0;
                  }
                  if(notas.t2){
                    total=total+1;
                  }else{
                    notas.t2=0;
                  }
                  if(notas.t3){
                    total=total+1;
                  }else{
                    notas.t3=0;
                  }
                  return (
                      <TableRow key={index} hover>
                        <TableCell className="text-dark">{notas.materia}</TableCell>
                        <TableCell className="text-dark">{notas.t1}</TableCell>
                        <TableCell className="text-dark">{notas.t2}</TableCell>
                        <TableCell className="text-dark">{notas.t3}</TableCell>
                        <TableCell className="text-dark">{Math.round((notas.t1 + notas.t2 + notas.t3) /total)}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
        </main>
      </div>
    </div>
    )
  }
export default (Calificaciones);