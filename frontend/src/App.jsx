import { useState } from 'react';
import UrlInput from './components/UrlInput';
import VideoDownloader from './components/VideoDownloader';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchVideoInfo = async () => {
    setLoading(true);
    setError('');
    setVideoInfo(null);
    try {
      const res = await axios.get(`https://youtube-downloader-2-p47c.onrender.com/api/v1/info?url=${url}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch video info');
      setVideoInfo(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (itag) => {
    if (!videoInfo) return;
    const downloadUrl = `https://youtube-downloader-2-p47c.onrender.com/api/v1/download?videoId=${videoInfo.videoId}&itag=${itag}`;
    window.open(downloadUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">YouTube Downloader</h1>
        <UrlInput url={url} setUrl={setUrl} onFetch={fetchVideoInfo} loading={loading} />
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <VideoDownloader videoInfo={videoInfo} onDownload={handleDownload} />
      </div>
    </div>
  );
}

export default App;