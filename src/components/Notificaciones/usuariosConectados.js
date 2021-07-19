const usuariosConectados = ({ users }) =>{

    return(
    <div className="user-list p-3">
    <h4 className="text-left text-secondary">Usuarios conectados</h4>
    {users.map( reemplazarDuplicados ).map((u, idx) => <h6 className="text-left" key={idx}>{u}</h6>)}
</div>
  )
}



function reemplazarDuplicados(value, index, self) { 
    return (self.indexOf(value) === index)?value:'';
}

export default usuariosConectados;