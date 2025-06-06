import { useState } from 'react';
import './App.css';
import UrlInput from './components/UrlInput';
import VideoInfo from './components/VideoInfo';

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
      const res = await fetch('/api/v1/video-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
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
    const downloadUrl = `/api/v1/download?videoId=${videoInfo.videoId}&itag=${itag}`;
    window.open(downloadUrl, '_blank');
  };

  return (
    <div className="container">
      <h1>YouTube Downloader</h1>
      <UrlInput url={url} setUrl={setUrl} onFetch={fetchVideoInfo} loading={loading} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <VideoInfo videoInfo={videoInfo} onDownload={handleDownload} />
    </div>
  );
}

export default App;
