import React from 'react';

function FormatTable({ formats, onDownload }) {
  return (
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
        {formats.map(f => (
          <tr key={f.itag}>
            <td>{f.qualityLabel || f.quality}</td>
            <td>{f.container}</td>
            <td>{f.hasAudio ? 'Yes' : 'No'}</td>
            <td>{f.hasVideo ? 'Yes' : 'No'}</td>
            <td>
              <button onClick={() => onDownload(f.itag)}>Download</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FormatTable;