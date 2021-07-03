import axios from "axios";

const baseUrl = "http://localhost:60671/api/"

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
