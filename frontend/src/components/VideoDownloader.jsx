import React from 'react';
import FormatTable from './FormatTable';

const VideoDownloader = ({ videoInfo, onDownload }) => {
  if (!videoInfo) {
    return null;
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h2>{videoInfo.title}</h2>
      <img src={videoInfo.thumbnailUrl} alt="thumbnail" style={{ maxWidth: 320 }} />
      <p>Channel: {videoInfo.channelName}</p>
      <p>Duration: {videoInfo.duration} seconds</p>
      <p>Views: {videoInfo.viewCount}</p>
      <h3>Available Formats</h3>
      <FormatTable formats={videoInfo.formats} onDownload={onDownload} />
    </div>
  );
};

export default VideoDownloader;
