import os from 'os';

const handler = async (m, { conn, bot, config }) => {
  const usedRam = (process.memoryUsage().rss / 1024 / 1024).toFixed(1);
  const heapUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);
  const heapTotal = (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(1);
  const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(1);
  const freeRam = (os.freemem() / 1024 / 1024 / 1024).toFixed(1);
  const cpuCores = os.cpus().length;
  const cpuModel = os.cpus()[0].model;
  const cpuSpeed = (os.cpus()[0].speed / 1000).toFixed(1);
  const cpuUsage = (os.loadavg()[0] * 100).toFixed(1);
  const platform = os.platform();
  const arch = os.arch();
  const hostname = os.hostname();
  const uptime = process.uptime();
  const uptimeHours = Math.floor(uptime / 3600);
  const uptimeMins = Math.floor((uptime % 3600) / 60);
  const uptimeSecs = Math.floor(uptime % 60);
  
  const groups = await conn.groupFetchAllParticipating();
  const groupCount = Object.values(groups).length;
  
  const subBots = global.subBots;
  const subCount = subBots?.list().length || 0;
  const subConnected = subBots?.list().filter(b => b.connected).length || 0;
  
  const msg = `
⚔️ *معلومات معسكر إيرن* 🔥

——> *الـجـنـد 🤖*
- *الاسم:* \`${conn.user.name || bot.config.info.nameBot || "Eren Bot"}\`
- *الرقم:* \`wa.me/+${conn.user.id.split(':')[0]}\`
- *شغال منذ:* \`${uptimeHours.toString().padStart(2, '0')}:${uptimeMins.toString().padStart(2, '0')}:${uptimeSecs.toString().padStart(2, '0')}\`

——> *الـمـعـسـكـر 💻*
- *النظام:* \`${platform} ${arch}\`
- *الجهاز:* \`${hostname}\`
- *المعالج:* \`${cpuModel.slice(0, 30)}...\`
- *النوى:* \`${cpuCores} نواة @ ${cpuSpeed}GHz\`
- *الحمل:* \`${cpuUsage}%\`

——> *الـطـاقـة 🧠*
- *الرام المستخدم:* \`${usedRam}MB / ${totalRam}GB\`
- *الرام الفارغ:* \`${freeRam}GB\`
- *Heap:* \`${heapUsed}MB / ${heapTotal}MB\`

——> *احـصـائـيـات الـقـتـال 📊*
- *المعسكرات:* \`${groupCount}\`

——> *الـجـنـود الـفـرعـيـين 🦾*
- *الإجمالي:* \`${subCount}\`
- *المتصل:* \`${subConnected}\`
- *المنفصل:* \`${subCount - subConnected}\`

——> *الـقـادة 👑*
- *العدد:* \`${bot.owners?.length || 0}\`
- *القائد:* \`${bot.owners?.[0]?.name || 'Eren'} (${bot.owners?.[0]?.jid?.split('@')[0] || 'لا يوجد'})\`

> *_تاتاكاي! استمر في القتال يا جندي_* 🦾🔥`;

  await conn.sendMessage(m.chat, {
    text: msg,
    contextInfo: context(m.sender, "https://i.pinimg.com/736x/cf/66/94/cf6694258ca9839b43bdaf415c6c56fc.jpg") }, { quoted: reply_status });
};

handler.command = ["معلومات", "info", "botinfo", "حالة"];
handler.category = "info";
handler.usage = ["معلومات"];
export default handler;

const context = (jid, img) => ({
    mentionedJid: [jid],
    isForwarded: true,
    forwardingScore: 1,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '0029VbCoE0P8aKvPbZf8hU1D@newsletter',
        newsletterName: '𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🐦',
        serverMessageId: 0
    },
    externalAdReply: {
        title: "𝐀𝐓𝐓𝐀𝐂𝐊 𝐎𝐍 𝐓𝐈𝐓𝐀𝐍 ⚔️ | 𝐄𝐫𝐞𝐧 𝐘𝐞𝐚𝐠𝐞𝐫",
        body: "𝚃𝚊𝚝𝚊𝚔𝚊𝚎 ~ ☆ 𝙵𝚒𝚐𝚑𝚝 𝚏𝚘𝚛 𝚏𝚛𝚎𝚎𝚍𝚘𝚖",
        thumbnailUrl: img,
        sourceUrl: '',
        mediaType: 1,
        renderLargerThumbnail: true
    }
});
