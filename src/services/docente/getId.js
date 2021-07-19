import url from "../../url"
const urlBase=`${url.url}/api/docente/getId`;

const getId = async () =>{
    const url=urlBase
    return await fetch(url, {
        method: 'GET',
        headers: { "Content-type": "application/json" },
        credentials: "include",
    }).then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var userid = JSON.parse(data);
        console.log(userid);
        return userid;
      })
}

export default getId;