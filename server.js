const express = require('express');
const axios = require('axios');
const app = express();

const IPINFO_TOKEN = '12ecd6b82b80a8';  // Registriere dich bei ipinfo.io und erhalte ein kostenloses Token

app.get('/', async (req, res) => {
    const user_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const firstIp = user_ip.split(',')[0].trim();
    // User-Agent des Besuchers erfassen
    const user_agent = req.headers['user-agent'];

    // Geolocation-Daten von IPinfo abrufen
    try {
        const response = await axios.get(`https://ipinfo.io/${user_ip}?token=${IPINFO_TOKEN}`);
        const locationData = response.data;

        console.log(`IP-Adresse: ${user_ip}`);
        console.log(`Standort: ${locationData.city}, ${locationData.region}, ${locationData.country},${locationData.city},${locationData.org}`);
        console.log(`User-Agent: ${user_agent}`);

        res.send(`
            <html lang="de">
            <head><title>Traffic Tracking Webseite</title></head>
            <body>
                <h1>Willkommen auf meiner Webseite</h1>
                <p>Dein Besuch wird getrackt!</p>
            </body>
            </html>
        `);
    } catch (error) {
        console.error('Fehler beim Abrufen der Geolocation:', error);
        res.send('Fehler beim Abrufen der Geolocation');
    }
});

app.listen(3000, () => {
    console.log('Server läuft auf Port 3000');
});
