const run = async (m, { conn, bot, args, text }) => {
  const sub = global.subBots;
  if (!sub) return m.reply("❌ *نظام الجنود الفرعيين غير متاح يا قائد!*");
  if (!text) return m.reply(`⚔️ *اعمل رياكت مع رابط الرسالة يا جندي!* 🔥\n> مثال: .رياكت https://whatsapp.com/channel/0029VaQim2bAu3aPsRVaDq3v/1050 | 🔥`);

  const [rawUrl, emoji] = text.split("|").map(s => s.trim());
  if (!emoji) return m.reply("❌ *حط الإيموجي بعد الرابط بعلامة | يا قائد!* 💢");

  const urlParts = rawUrl.split("/");
  const channelInvite = urlParts[urlParts.length - 2];
  const messageId = urlParts[urlParts.length - 1];

  if (!channelInvite || !messageId) return m.reply("❌ *الرابط مش صحيح يا قائد!* 💀");

  let channelJid;
  try {
    const metadata = await conn.newsletterMetadata("invite", channelInvite);
    channelJid = metadata.id;
  } catch (err) {
    return m.reply(`❌ *مش قادر أوصل للقناة يا قائد!*`);
  }

  const res = (await sub.list()).filter(b => b.connected && b.phone && b.id !== bot.id);
  if (res.length === 0) return m.reply("💀 *مفيش جنود فرعيين متصلين يا قائد!*");

  const ids = [];
  const loadingMsg = await conn.sendMessage(m.chat, {
    text: "```⏳ جـاري عـمـل ريـاكـت فـي الـمـعـسـكـر...```"
  }, { quoted: global.reply_status });

  for (const bots of res) {
    try {
      const subBot = await sub.get(bots.id);
      await subBot.sock.newsletterReactMessage(channelJid, messageId, emoji);
      ids.push(bots.id);
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (err) {}
  }
  
  return await conn.sendMessage(m.chat, {
    text: `✅ *تم إرسال الرياكت (${emoji}) لـ ${ids.length} جندي فرعي!* 🦾\n\n> تاتاكاي! استمر في القتال يا قائد 🔥`,
    edit: loadingMsg.key,
  });
};

run.command = ["رياكت"];
run.noSub = true;
run.owner = true;
run.usage = ["رياكت"];
run.category = "sub";
export default run;
