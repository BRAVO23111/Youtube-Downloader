import React from 'react';

function UrlInput({ url, setUrl, onFetch, loading }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
        style={{ width: '60%' }}
      />
      <button onClick={onFetch} disabled={loading || !url}>
        {loading ? 'Loading...' : 'Get Info'}
      </button>
    </div>
  );
}

export default UrlInput;