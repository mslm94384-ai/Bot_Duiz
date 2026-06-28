const run = async (m, { conn, bot }) => {
  const sub = global.subBots;
  if (!sub) return m.reply("❌ *نظام الجنود الفرعيين غير متاح يا قائد!*");

  const stats = sub.stats();
  const uptime = process.uptime();
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);

  const text = `⚔️ *إحصائيات الجنود الفرعيين في المعسكر* 🔥
⊱⋅ ──────────── ⋅⊰
🦾 — المجموع: ${stats.total}
🟢 — في المعركة: ${stats.connected}
🔴 — في الاستراحة: ${stats.disconnected}
💬 — الرسائل: ${stats.totalMessages}
⊱⋅ ──────────── ⋅⊰
⏱️ — مدة القتال: ${days} يوم ${hours} ساعة ${minutes} دقيقة
⊱⋅ ──────────── ⋅⊰
🆔 — القائد: ${bot.sock.user.id.split('@')[0]}
⊱⋅ ──────────── ⋅⊰
> *_تاتاكاي! استمر في القتال يا قائد_* 🦾🔥`;

  await m.reply(text);
};

run.command = ["احصائيات_البوتات"];
run.noSub = true;
run.usage =  ["احصائيات_البوتات"];
run.category = "sub";
export default run;
