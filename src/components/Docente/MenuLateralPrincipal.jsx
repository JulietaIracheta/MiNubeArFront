


const MenuLateralPrincipal = ({items}) =>{
    let classname = 'nav-link text-dark'
    return(
        
        <div className="menu-lateral col-12 col-md-2 pt-3 border-right d-none d-md-block" > 
            <ul className="nav flex-column justify-content-start ">
                {items && items.map( item => 
                    <li className="nav-item">
                        <a className={item.activo? classname + ' font-weight-bold' : classname } href="/#">{item.nombre}</a>
                    </li>   
                )
                }
            </ul>
        </div>
    )
}     
    


export default MenuLateralPrincipal;