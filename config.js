const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "PuADyBZI#-TnF7cCmlQ-hQKgwoUot1rEqQ04Bp3V3p1k4RC3s170",
ALIVE_IMG: process.env.ALIVE_IMG || "https://github.com/Freemc2024/WB/blob/main/scr/alive.jpg?raw=true",
ALIVE_MSG: process.env.ALIVE_MSG || "*Hello👋 PASIYA-WhatsappBot Is Alive Now😍*",
BOT_OWNER: '94772582943',  // Replace with the owner's phone number



};
