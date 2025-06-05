import express from 'express';
import ytdl from '@distube/ytdl-core';

const router = express.Router();


router.get('/download   ', async (req, res) => {
    const {videoId , itag} = req.query;
    if (!videoId || !itag) {
        return res.status(400).json({ error: 'videoId and itag are required' });
    }
    try {
        const info = await ytdl.getInfo(videoId);
        const format = info.formats.find(f => f.itag === parseInt(itag, 10));
        if (!format) {
            return res.status(404).json({ error: 'Format not found' });
        }

         const filename = `${info.videoDetails.title.replace(/[^\w\s]/gi, '')}.${format.container}`;

         res.header('Content-Disposition', `attachment; filename="${filename}"`);
         res.header('Content-Type', `video/${format.container}`);

            ytdl(videoId, { quality: itag }).pipe(res);
        
    } catch (error) {
        console.error('Error fetching video info:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
    

});

export  {router as downloadRouter};

