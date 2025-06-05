import ytdl from '@distube/ytdl-core';
import express from 'express';
import { downloadRouter } from './routes/download.js';
import { videoInfoRouter } from './routes/video-info.js';

const app = express();
app.use(express.json());

app.use("/api/v1" , downloadRouter);
app.use("/api/v1" , videoInfoRouter)


app.listen(3000, () => {
  console.log('Server is running on port 3000');
}
);