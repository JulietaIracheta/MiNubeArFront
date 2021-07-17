
const urlBase='http://134.209.120.136:4000/api/docente/getId';

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