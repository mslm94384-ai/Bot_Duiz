const run = async (m, { conn, bot }) => {
  if (bot.isSubBot) return;
  if (!m.quoted) return m.reply("⚔️ *رد على رسالة الجندي يا قائد!* 🔥");
  
  const groups = await conn.groupFetchAllParticipating();
  const groupList = Object.values(groups);
  
  if (groupList.length === 0) return m.reply("💀 *مفيش معسكرات يا قائد!*");
  
  let success = 0;
  
  for (const group of groupList) {
    try {
      const metadata = await conn.groupMetadata(group.id);
      const mentions = metadata.participants.map(p => p.id);
      
      await conn.sendMessage(group.id, {
        forward: m.quoted.fakeObj(),
        mentions: mentions,
        contextInfo: {
          isForwarded: true,
          forwardingScore: 1,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '0029VbCoE0P8aKvPbZf8hU1D@newsletter',
            newsletterName: '𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🐦',
            serverMessageId: 0
          }
        }
      });
      success++;
      await new Promise(r => setTimeout(r, 2000));
    } catch {}
  }
  
  await m.reply(`✅ *تم إرسال الرسالة لـ ${success} معسكر* 🦾\n\n> تاتاكاي! استمر في القتال يا قائد 🔥`);
};

run.command = ["اذاعه"];
run.usage = ["اذاعه"];
run.category = "owner";
run.owner = true;
export default run;
