const API_URL = 'http://localhost:1337';

export let listLogEntries = async() => {
    const response = await fetch('http://localhost:1337/api/logs');
    return response.json();
}

export let createLogEntries = async(entry) => {
    const response = await fetch('http://localhost:1337/api/logs', {
        method:'POST',
        headers: {
            'content-type':'application/json'
        },
        body:JSON.stringify(entry)
    });
    return response.json();
}