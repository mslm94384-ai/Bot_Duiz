const run = async (m, { args, conn, bot }) => {
  const sub = global.subBots;
  if (!sub) return m.reply("❌ *نظام الجنود الفرعيين غير متاح يا قائد!*");

  if (!args[0]) {
    return m.reply(`⚔️ *حذف جندي فرعي* 🔥\n\nمثال:\n${bot.config.prefix[0]}حذف_بوت 1\n${bot.config.prefix[0]}حذف_بوت 201234567890`);
  }

  const input = args[0];
  let deleted = false;

  if (/^\d+$/.test(input) && input.length <= 2) {
    const idx = parseInt(input) 
    try {
      await sub.removeByIndex(idx);
      deleted = true;
    } catch (e) {
      return m.reply(`❌ *فشل الحذف يا قائد!* 💢\n> ${e.message}`);
    }
  } 
  else if (/^\d+$/.test(input)) {
    deleted = await sub.removeByPhone(input);
    if (!deleted) return m.reply(`💀 *لا يوجد جندي بالرقم ${input} يا قائد!*`);
  }

  if (deleted) {
    await m.reply(`✅ *تم حذف الجندي من المعسكر بنجاح!* 🦾\n\n> تاتاكاي! استمر في القتال يا قائد 🔥`);
  }
};

run.command = ["حذف_بوت"];
run.usage =  ["حذف_بوت"];
run.category = "sub";
run.noSub = true;
run.owner = true;

export default run;
