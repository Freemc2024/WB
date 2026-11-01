
const { cmd, commands } = require("../command");
const yts = require("yt-search");
const { ytmp4 } = require("@vreden/youtube_scraper");

cmd(
  {
    pattern: "video",
    alias: ["mp4", "ytv"],
    react: "🎬",
    desc: "Download YouTube Video",
    category: "download",
    filename: __filename,
  },

  async (
    pasiya,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      if (!q) {
        return reply(
          "❌ *Please provide a YouTube video name or link*\n\n" +
          "Example: .video Alan Walker Faded"
        );
      }

      // Search YouTube
      const search = await yts(q);

      const data = search.videos?.[0];

      if (!data) {
        return reply("❌ *No YouTube video found!*");
      }

      const url = data.url;

      // Video duration
      let durationParts = data.timestamp.split(":").map(Number);

      let totalSeconds =
        durationParts.length === 3
          ? durationParts[0] * 3600 +
            durationParts[1] * 60 +
            durationParts[2]
          : durationParts[0] * 60 + durationParts[1];

      // Maximum duration: 30 minutes
      if (totalSeconds > 1800) {
        return reply(
          "⏳ *Sorry, videos longer than 30 minutes are not supported.*"
        );
      }

      let desc = `
🎬 *YouTube Video Downloader*

📌 *Title:* ${data.title}
⏱️ *Duration:* ${data.timestamp}
📅 *Uploaded:* ${data.ago}
👀 *Views:* ${data.views.toLocaleString()}
📺 *Quality:* 720p
🔗 *Watch Here:* ${url}

⏳ *Downloading your video...*
`;

      // Send thumbnail
      await pasiya.sendMessage(
        from,
        {
          image: { url: data.thumbnail },
          caption: desc,
        },
        { quoted: mek }
      );

      // Download MP4 using Vreden
      const videoData = await ytmp4(url, 720);

      if (
        !videoData ||
        !videoData.status ||
        !videoData.download ||
        !videoData.download.status ||
        !videoData.download.url
      ) {
        throw new Error(
          videoData?.download?.message ||
          videoData?.message ||
          "Video download failed!"
        );
      }

      const videoUrl = videoData.download.url;

      const videoTitle =
        videoData.metadata?.title || data.title;

      // Send video
      await pasiya.sendMessage(
        from,
        {
          video: {
            url: videoUrl,
          },
          mimetype: "video/mp4",
          fileName: `${videoTitle}.mp4`,
          caption:
            `🎬 *${videoTitle}*\n\n` +
            `📥 *Quality:* ${videoData.download.quality}\n` +
            `✅ *Download Complete!*\n\n` +
            `❤️ Thank you for using our bot.`,
        },
        { quoted: mek }
      );

      return reply("✅ *Video downloaded successfully!*");

    } catch (e) {
      console.log("VIDEO DOWNLOADER ERROR:", e);

      return reply(
        `❌ *Error:* ${e.message} 😞`
      );
    }
  }
);
