let handler = async (m, { conn }) => {
m.reply(`⚔️ *رابط الجندي:* 🔥\nwa.me/${m.sender.split("@")[0]}\n\n> جهز نفسك للمعركة يا جندي! 🦾`)
}
handler.usage = ["رابطي"];
handler.category = "group";
handler.command = ["رابطي"];

export default handler;
