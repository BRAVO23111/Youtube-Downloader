import React from 'react';
import FormatTable from './FormatTable';

const VideoDownloader = ({ videoInfo, onDownload }) => {
  if (!videoInfo) {
    return null;
  }

  return (
    <div className="mt-10 flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{videoInfo.title}</h2>
      <img src={videoInfo.thumbnailUrl} alt="thumbnail" className="rounded-lg shadow mb-4 max-w-xs" />
      <div className="flex flex-wrap justify-center gap-4 mb-4 text-gray-700">
        <span><span className="font-medium">Channel:</span> {videoInfo.channelName}</span>
        <span><span className="font-medium">Duration:</span> {videoInfo.duration} seconds</span>
        <span><span className="font-medium">Views:</span> {videoInfo.viewCount}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">Available Formats</h3>
      <FormatTable formats={videoInfo.formats} onDownload={onDownload} />
    </div>
  );
};

export default VideoDownloader;
