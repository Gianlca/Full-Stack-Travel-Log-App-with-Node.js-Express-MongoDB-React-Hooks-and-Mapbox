const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:1337/api/logs' : 'https://travel-log-api.gianlucacina.now.sh';


export let listLogEntries = async() => {
    const response = await fetch(`${API_URL}/api/logs`);
    return response.json();
}

export let createLogEntries = async(entry) => {
    const apiKey = entry.apiKey;
    const response = await fetch(`${API_URL}/api/logs`, {
        method:'POST',
        headers: {
            'content-type':'application/json',
            'X-API-KEY': apiKey,
        },
        body:JSON.stringify(entry)
    });
    const json = await response.json();
    if (response.ok) {
        return json;
    } 
        const error = new Error(json.message);
        error.response = json;
        throw error;
    
}