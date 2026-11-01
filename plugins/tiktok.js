
const { cmd } = require("../command");
const { ytmp3, ytmp4, tiktok } = require("sadaslk-dlcore");

cmd(
  {
    pattern: "tiktok",
    alias: ["tt"],
    desc: "Download TikTok video",
    category: "download",
    filename: __filename,
  },
  async (pasiya, mek, m, { from, q, reply }) => {
    try {
      if (!q) return reply("📱 Send TikTok link");

      reply("⬇️ Downloading TikTok video...");

      const data = await tiktok(q);
      if (!data?.no_watermark)
        return reply("❌ Failed to download TikTok video");

      const caption =
        `🎵 *${data.title || "TikTok Video"}*\n\n` +
        `👤 Author: ${data.author || "Unknown"}\n` +
        `⏱ Duration: ${data.runtime}s`;

      await pasiya.sendMessage(
        from,
        {
          video: { url: data.no_watermark },
          caption,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.log("TIKTOK ERROR:", e);
      reply("❌ Error while downloading TikTok video");
    }
  }
);

