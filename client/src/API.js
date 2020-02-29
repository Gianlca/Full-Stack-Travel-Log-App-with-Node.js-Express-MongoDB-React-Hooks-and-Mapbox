const API_URL = 'http://localhost:1337';

export let listLogEntries = async() => {
    const response = await fetch('http://localhost:1337/api/logs');
    return response.json();
}