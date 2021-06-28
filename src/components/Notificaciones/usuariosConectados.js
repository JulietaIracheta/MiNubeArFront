const usuariosConectados = ({ users }) => <div className="user-list">
    <h4>Usuarios conectados</h4>
    {users.map( reemplazarDuplicados ).map((u, idx) => <h6 key={idx}>{u}</h6>)}
</div>
function reemplazarDuplicados(value, index, self) { 
    return (self.indexOf(value) === index)?value:'';
}

export default usuariosConectados;