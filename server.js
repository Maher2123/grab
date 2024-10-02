const express = require('express');
const app = express();

app.set('trust proxy', true);  // Vertraue dem Proxy, um die echte IP zu bekommen

app.get('/', (req, res) => {
    // IP-Adresse des Besuchers erfassen
    const user_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const date = new Date().toISOString();

    res.send(`
        <html lang="de">
        <head><title>Traffic Tracking Webseite</title></head>
        <body>
            <h1>Willkommen auf meiner Webseite</h1>
            <p>Dein Besuch wird getrackt!</p>
        </body>
        </html>
    `);

    console.log(`IP-Adresse: ${user_ip} - Datum: ${date}`);
});

app.listen(3000, () => {
    console.log('Server läuft auf Port 3000');
});
