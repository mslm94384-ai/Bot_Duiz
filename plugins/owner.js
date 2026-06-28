let handler = async (m, { conn, bot }) => {
  let watermark = '𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🧛';
  
  let quoted = {
    key: { fromMe: false, participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' },
    message: { conversation: '𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🧛' }
  };
  
  // جلب كل الأونرز
  const owners = bot.config.owners || [];
  const vcards = owners.map(owner => {
    const num = owner.jid.split("@")[0];
    return `BEGIN:VCARD
VERSION:3.0
FN:${owner.name || 'جندي مجهول'}
TEL;type=CELL;waid=${num}:+${num}
END:VCARD`;
  });

  let img = 'https://i.pinimg.com/originals/e2/21/20/e221203f319df949ee65585a657501a2.jpg';
  
  await conn.sendMessage(m.chat, {
    contacts: { 
      displayName: watermark, 
      contacts: vcards.map(vcard => ({ vcard })) 
    },
    contextInfo: {
      forwardingScore: 2023,
      externalAdReply: {
        title: '⚔️ 𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🧛',
        body: watermark,
        sourceUrl: 'https://whatsapp.com/channel/0029VbCoE0P8aKvPbZf8hU1D',
        thumbnailUrl: img,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true,
        newsletter: {
          name: '𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🐦',
          jid: '0029VbCoE0P8aKvPbZf8hU1D@newsletter'
        }
      }
    }
  }, { quoted })
};

handler.command = /^(owner|مطور|المطور)$/i;

export default handler;
