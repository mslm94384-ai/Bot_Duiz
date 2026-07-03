import { Client } from 'meowsab';
import { group, access } from "./system/control.js";
import UltraDB from "./system/UltraDB.js";
import sub from './sub.js';

/* =========== Client ========== */
const client = new Client({
  phoneNumber: '2001093496624', // Bot number
  prefix: [".", "/", "!"],
  fromMe: false, 
  owners: [
    { name: "𝐄𝐑𝐈𝐍", jid: "201044013292@s.whatsapp.net", lid: "247579682029763@lid" },
    { name: "𝐀𝐑𝐌𝐀𝐍", jid: "201227812859@s.whatsapp.net", lid: "221307316789354@lid" },
    { name: "𝐒𝐔𝐊𝐔𝐍𝐀", jid: "201554302724@s.whatsapp.net", lid: "50414477168824@lid" }
  ],
  settings: { noWelcome: false },
  commandsPath: './plugins'
});

client.onGroupEvent(group);
client.onCommandAccess(access);

/* =========== Database ========== */
if (!global.db) {
    global.db = new UltraDB();
}

/* =========== Config ========== */
const { config } = client;
config.info = { 
  nameBot: "𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🧛", 
  nameChannel: "𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🐦", 
  idChannel: "0029VbCoE0P8aKvPbZf8hU1D@newsletter",
  urls: {
    repo: "https://github.com/deveni0/Pomni-AI",
    api: "https://emam-api.web.id",
    channel: "https://whatsapp.com/channel/0029VbCoE0P8aKvPbZf8hU1D"
  },
  copyright: { 
    pack: '𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🧛', 
    author: '🐦'
  },
  images: [
    "https://i.pinimg.com/originals/11/26/97/11269786cdb625c60213212aa66273a9.png",
    "https://i.pinimg.com/originals/e2/21/20/e221203f319df949ee65585a657501a2.jpg",
    "https://i.pinimg.com/originals/bb/77/0f/bb770fad66a634a6b3bf93e9c00bf4e5.jpg"
  ]
};

/* =========== Start ========== */
client.start();

setTimeout(async () => {
if (client.commandSystem) { 
sub(client)
  }
}, 2000);


/* =========== Catch Errors ========== */
process.on('uncaughtException', (e) => {
    if (e.message.includes('rate-overlimit')) {}
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err)
});
