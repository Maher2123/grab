const express = require('express');
const axios = require('axios');
const app = express();
const path =require("path")

const IPINFO_TOKEN = '12ecd6b82b80a8';  // Registriere dich bei ipinfo.io und erhalte ein kostenloses Token

app.get('/', async (req, res) => {
    const user_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const firstIp = user_ip.toString().split(',')[0].trim();
    // User-Agent des Besuchers erfassen
    //const user_ip = '34.83.194.43, 162.158.87.38, 10.217.163.241';
   // const firstIp = user_ip.split(',')[0].trim();
    const user_agent = req.headers['user-agent'];

    app.get('/download', (req, res) => {
        const filePath = path.join(__dirname, 'traffic_log.txt');  // Pfad zur Datei
        res.download(filePath, 'traffic_log.txt', (err) => {
            if (err) {
                console.error('Fehler beim Senden der Datei:', err);
            }
        });
    });
    // Geolocation-Daten von IPinfo abrufen
    try {
        const response = await axios.get(`https://ipinfo.io/${firstIp}?token=${IPINFO_TOKEN}`);
        const locationData = response.data;

        console.log(`IP-Adresse: ${firstIp}`);
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
