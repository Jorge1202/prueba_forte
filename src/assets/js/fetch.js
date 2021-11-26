const URL = 'http://apps01.forteinnovation.mx:8590/api/';// SANDBOX 

class Fetch {
    // PETICIÓN GET
    async GET(obj) {
        return await _AJAX(obj.url, 'GET');
    }

    // PETICIÓN POST
    async POST(obj) {
        return await _AJAX(obj.url, 'POST', obj.params);
    }

    // PETICIÓN PUT
    async PUT(obj) {
        return await _AJAX(obj.url, 'PUT', obj.params);
    }

    // PETICIÓN DELETE
    async DELETE(obj) {
        return await _AJAX(obj.url, 'DELETE', obj.params);
    }
}
export default Fetch;

async function _AJAX(url, type, parameters = null, async = true) {
    let token = '';

    let sesion = sessionStorage.getItem('token');
    if(sesion && sesion.length!=0){
        token = `Bearer ${sessionStorage.getItem('token')}`;
    } 
  
    let opcions = {
        async: async,
        crossDomain: true,
        method: type,
        headers: {
            "Authorization": token,
            'Content-Type': 'application/json;charset=utf-8'
        }
    };
    if(type !== 'GET'){
        if(parameters) opcions.body= JSON.stringify(parameters)
    }

    let response = await fetch(
        URL + url, 
        opcions
    );
    let result = await response.json();
    return result;
}
