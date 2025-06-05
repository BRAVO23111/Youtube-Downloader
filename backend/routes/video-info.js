import ytdl from '@distube/ytdl-core';
import express from 'express';
const router = express.Router();


router.post('/video-info', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: 'URL is required' });
    }

    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ message: 'Invalid YouTube URL' });
    }

    const videoId = ytdl.getVideoID(url);
    const videoInfo = await ytdl.getInfo(videoId);

    const formats = videoInfo.formats.map(format => ({
      itag: format.itag,
      qualityLabel: format.qualityLabel,
      container: format.container,
      quality: format.quality,
      hasAudio: format.hasAudio,
      hasVideo: format.hasVideo,
      contentLength: format.contentLength,
      bitrate: format.bitrate
    }));

    res.json({
      title: videoInfo.videoDetails.title,
      description: videoInfo.videoDetails.description,
      thumbnailUrl: videoInfo.videoDetails.thumbnails?.slice(-1)[0]?.url || '',
      channelName: videoInfo.videoDetails.author.name,
      duration: parseInt(videoInfo.videoDetails.lengthSeconds),
      viewCount: parseInt(videoInfo.videoDetails.viewCount),
      formats,
      videoId
    });

  } catch (error) {
    console.error('Error fetching video info:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch video info' });
  }
});

export { router as videoInfoRouter };