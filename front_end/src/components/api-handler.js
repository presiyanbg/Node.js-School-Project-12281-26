const ApiHandler = () => {

    const send = async (url) => {
        const response = await fetch(url, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
        })
        .then(response => response.json());
        return response;
    }

    const get = async (url) => {
        const response = await fetch(url, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
        })
        .then(response => response.json());

        return response;
    }

    return {
        send : send,
        get : get,
    }
}

export default ApiHandler;
