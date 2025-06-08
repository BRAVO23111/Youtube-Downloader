import React from 'react';

function UrlInput({ url, setUrl, onFetch, loading }) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full sm:w-auto"
      />
      <button
        onClick={onFetch}
        disabled={loading || !url}
        className={`px-6 py-2 rounded-md font-semibold text-white transition bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed`}
      >
        {loading ? 'Loading...' : 'Get Info'}
      </button>
    </div>
  );
}

export default UrlInput;