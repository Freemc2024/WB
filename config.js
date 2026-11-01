const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "3vw1QYgb#Lu-E_UIZ2RFdYmbMq8N7saQQxrG6qJPAFBAAFFj586k",
ALIVE_IMG: process.env.ALIVE_IMG || "https://github.com/Freemc2024/WB/blob/main/scr/alive.jpg?raw=true",
ALIVE_MSG: process.env.ALIVE_MSG || "*Hello👋 PASIYA-WhatsappBot Is Alive Now😍*",
BOT_OWNER: '94772582943',  // Replace with the owner's phone number
AUTO_STATUS_SEEN: 'true',
AUTO_STATUS_REACT: 'false',



};
