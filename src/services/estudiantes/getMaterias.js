import axios from "axios";

const baseUrl = "http://localhost:60671/api/"

export default async function getMaterias(email) {
    const url = baseUrl + 'usuario/materias?email=' + email;
    
    return (
        axios.get(url)
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
