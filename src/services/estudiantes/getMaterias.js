import axios from "axios";
import url from "../../url"
const baseUrl = `${url.url}/api/`

export default async function getMaterias() {
    const url = baseUrl + 'estiduante/materias';
    
    return (
        await axios.get(url, {                      
                headers: { "Content-type": "application/json" },
                credentials: "include",        
            })
            .then(function (response) {
                // handle success
                console.log("getMaterias: ");
                console.log(response);
                
                return response
            }).catch(function (error) {
                console.log("getMateriasError: ");
                console.log(error);
            })
    )
}
