
const { cmd } = require("../command");
const { alldl } = require("rahad-all-downloader-v2");

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

      const url = q.trim();

      if (!/^https?:\/\/(?:(?:www|vm|vt|m)\.)?tiktok\.com\//i.test(url)) {
        return reply("❌ Please send a valid TikTok link");
      }

      reply("⬇️ Downloading TikTok video...");

      const result = await alldl(url);

      const videoUrl = result?.data?.videoUrl;

      if (!videoUrl) {
        return reply("❌ Failed to download TikTok video");
      }

      const caption =
        `🎵 *${result.data.title || "TikTok Video"}*\n\n` +
        `📱 Platform: TikTok`;

      await pasiya.sendMessage(
        from,
        {
          video: { url: videoUrl },
          mimetype: "video/mp4",
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
