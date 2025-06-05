import { useState } from 'react';
import './App.css';

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
      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
        style={{ width: '60%' }}
      />
      <button onClick={fetchVideoInfo} disabled={loading || !url}>
        {loading ? 'Loading...' : 'Get Info'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {videoInfo && (
        <div style={{ marginTop: 20 }}>
          <h2>{videoInfo.title}</h2>
          <img src={videoInfo.thumbnailUrl} alt="thumbnail" style={{ maxWidth: 320 }} />
          <p>Channel: {videoInfo.channelName}</p>
          <p>Duration: {videoInfo.duration} seconds</p>
          <p>Views: {videoInfo.viewCount}</p>
          <h3>Available Formats</h3>
          <table border="1" cellPadding="6">
            <thead>
              <tr>
                <th>Quality</th>
                <th>Container</th>
                <th>Audio</th>
                <th>Video</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {videoInfo.formats.map(f => (
                <tr key={f.itag}>
                  <td>{f.qualityLabel || f.quality}</td>
                  <td>{f.container}</td>
                  <td>{f.hasAudio ? 'Yes' : 'No'}</td>
                  <td>{f.hasVideo ? 'Yes' : 'No'}</td>
                  <td>
                    <button onClick={() => handleDownload(f.itag)}>Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
