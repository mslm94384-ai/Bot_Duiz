import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';
import { uploadToCatbox } from "../../system/utils.js";

const handler = async (m, { conn, command }) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || '';

  if (!mime) throw `⚔️ *رد على الصورة أو الفيديو يا جندي!* 🔥`;
  
  const media = await q.download();
  const link = await uploadToCatbox(media);
  
  await conn.sendButton(m.chat, {
    imageUrl: link,
    bodyText: `⚔️ *تم الرفع في المعسكر!* 🦾\n- \`${link}\``,
    footerText: "𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🐦",
    buttons: [
      { name: "cta_copy", params: { display_text: "📋 نسخ الرابط", copy_code: link } },
    ],
    mentions: [m.sender],
    newsletter: {
      name: '𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🐦',
      jid: '0029VbCoE0P8aKvPbZf8hU1D@newsletter'
    },
    interactiveConfig: {
      buttons_limits: 10,
      list_title: "𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🐦",
      button_title: "اضغط هنا",
      canonical_url: "https://vxv-profile.vercel.app"
    }
  }, m);
};

handler.usage = ["لرابط2"];
handler.category = "tools";
handler.command = ['لرابط2', 'image2url2'];

export default handler;
