const example = async (m, { conn }) => {

return await conn.sendButtonNormal(m.chat, {
  media: { url: 'https://qu.ax/x/6GwxA.mp4' },
  mediaType: 'video', // or image
  caption: `هلا والله, @${m.sender.split("@")[0]} 🦾`,
  buttons: [
// 1. Quick Reply
    { name: "quick_reply", params: { display_text: "👍 تمام", id: "quick1" } },
    { name: "quick_reply", params: { display_text: "👎 لا يعجبني", id: "quick2" } },
    
    // 2. URL Button
    { name: "cta_url", params: { display_text: "🔗 قناتي", url: "https://whatsapp.com/channel/0029VbCoE0P8aKvPbZf8hU1D" } },
    
    // 3. Call Button
    { name: "cta_call", params: { display_text: "📞 اتصل بيا", phone_number: "201234567890" } },
    
    // 4. Copy Button
    { name: "cta_copy", params: { display_text: "📋 انسخ الكود", copy_code: "تاتاكاي!" } },
    
    // 5. Single Select Menu
    { name: "single_select", params: { 
      title: "📋 اختار من القائمة",
      sections: [{
        title: "الخيارات",
        rows: [
          { title: "خيار 1", description: "وصف الخيار الأول", id: "opt1" },
          { title: "خيار 2", description: "وصف الخيار الثاني", id: "opt2" }
        ]
      }]
    }},
    
    // 6. Call Permission Request
    { name: "call_permission_request", params: { 
      display_text: "📞 طلب اتصال",
      phone_number: "201234567890",
      duration: 60
    }}
  ], 
  mentions: [m.sender],
  newsletter: {
      name: '𝐄𝐑𝐈𝐍 𝐁𝐎𝐓 🐦',
      jid: '0029VbCoE0P8aKvPbZf8hU1D@newsletter'
    },
}, m)

};
example.usage = ["تست5"]
example.category = "example";
example.command = ["تست5"]
export default example;
