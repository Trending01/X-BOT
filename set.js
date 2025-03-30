const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'BELTAH-MD;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUFid05QK05oMC9BeEpTa0hOelR6UVhMemZkcHJla1JFVTRVSlZWTjdsST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0h0NmRxcFFvamdlWkJFM0VJWk9lSGtvUkhjeHIzZlhXMDFMYjJlMTFUdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTTXVhQk5QMDZwQ1ZVc1QyZ3BhSGR6U1Y3Um1FU3VZU3BUbzd6cTJNdTBRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1WWUxWWEzT1N2YjJ6N0R5bzViYlN0Sk9KV1dMcWVvUS9yYllHbGgxbjBvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlOdTRFQVRTdHMxUk9vbkVIN0hoSEZhNTNEZ3VNSWxLZkk3ekQvLzRWMXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNzd2tIQlcydnVzMWpjZUNQdzQ1NEZ0cmFMU2JDZzNnUjVFd3Bad0RhRnM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0RSYUlla2dteXRBQ2x0NnpLN3pHQ1JzQVpTYmNmckFKZmFCc0NBbmxHYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWnZZWWc0bDFKSlFlamVySXVJSjdRallSRG1oVUNad1lEdStxWS9ZaGIycz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZiZ0FIVzFCMDBtbzBqbzd6TFZIdHVpYXduY1pRcUVHRW96R1JVQW84am03Z1RJb25lc0RZQmJDZ2IreDJjQitTNkM1RUJSSU1OMTJnR0h2anhaZkJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcwLCJhZHZTZWNyZXRLZXkiOiJoc3ZWNmcvNnpNWUZMeE9FWlZDWkxFVmRGS1JqakgxellGZGJ4eUtINE0wPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ2TURSVjdMZlEwMkw1S0RUM1ozMGZRIiwicGhvbmVJZCI6IjlkOTEzYjAzLWE4ODEtNGY5Yi05ZWNlLWU0NWIzYWQ2ZGUzYiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpVFJUMm83M3lpWXB6TnlmL2xyWm5PenFOL0E9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUt3WWFXbDhyb1c2blptWk5TaTZWVXZoRkM0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjRXRFhaN0VTIiwibWUiOnsiaWQiOiIxMzMyMzIzNzY1ODo2MEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS3JHdnNzTEVOMlBwcjhHR0NvZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoieWtqc0NxcFBRZkUxenBOekc0WTI1aE54QTcwRHo3RUVGWFFBMGl2aVQzQT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiekg5TjZ2TlozOU1vWDFOdmhTaE5ocWpoYkhyUGhpM1lnS29DSU10Q2Nycnc0eWJicjhLUytzT2pKd1ZjdUUyMGh5VjZhQUROU1VPODl1dTdJczZSQUE9PSIsImRldmljZVNpZ25hdHVyZSI6IlJOR1VDQUEzV1V2bEZNWm5XOHBud054WUF4Vy9aakRpMTcxeTFjS2JmYVUzVk9RMUZ2c2hNeE1rSktDaUFHTGtqbUhUMDFLOVFrWVArc2FwaXFiWkF3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMTMzMjMyMzc2NTg6NjBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY3BJN0FxcVQwSHhOYzZUY3h1R051WVRjUU85QTgreEJCVjBBTklyNGs5dyJ9fV0sInBsYXRmb3JtIjoiaXBob25lIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQzMzU3OTMxLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUNyVyJ9',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/Beltah254/BELTAH-MD',
    OWNER_NAME : process.env.OWNER_NAME || "TrendingBoss",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "13323237658",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
    URL: process.env.URL || "https://telegra.ph/file/dcce2ddee6cc7597c859a.jpg",  
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'non',              
    EMOJIS: process.env.EMOJIS || "",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_CONTROL || 'no', 
    GREET : process.env.GREET || "no",            
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || 'viewed by Trending boss',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTOBIO: process.env.AUTOBIO || 'no',       
    ANTICALL_MSG : process.env.ANTICALL_MESSAGE || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VAUSV0PFCCOSB5TX9C1F",
    EVENTS :process.env.EVENTS || "yes",
    CAPTION : process.env.CAPTION || "TRENDING-BOSS",
    BOT : process.env.BOT_NAME || 'TRENDING-BOSS',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Ghana", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL: process.env.ANTICALL || 'yes',              
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
