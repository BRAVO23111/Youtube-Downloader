import * as ScrollArea from '@radix-ui/react-scroll-area';
import React, { useState } from 'react';

function FormatTable({ formats, onDownload }) {
  const [visibleCount, setVisibleCount] = useState(5);
  const showAll = visibleCount >= formats.length;
  return (
    <ScrollArea.Root className="w-full rounded-lg border border-gray-200 shadow max-h-96">
      <ScrollArea.Viewport className="w-full">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 font-semibold text-gray-700">Quality</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Container</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Audio</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Video</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Download</th>
            </tr>
          </thead>
          <tbody>
            {formats.slice(0, visibleCount).map((f, idx) => (
              <tr key={f.itag + '-' + idx} className="border-t border-gray-200 hover:bg-blue-50">
                <td className="px-4 py-2 text-center">{f.qualityLabel || f.quality}</td>
                <td className="px-4 py-2 text-center">{f.container}</td>
                <td className="px-4 py-2 text-center">{f.hasAudio ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 text-center">{f.hasVideo ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => onDownload(f.itag)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded shadow font-medium transition"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical" className="ScrollAreaScrollbar" />
      {formats.length > 5 && (
        <div className="flex justify-center mt-2">
          <button
            className="text-blue-600 hover:underline font-medium px-4 py-1"
            onClick={() => setVisibleCount(showAll ? 5 : formats.length)}
          >
            {showAll ? 'View Less' : 'View More'}
          </button>
        </div>
      )}
    </ScrollArea.Root>
  );
}

export default FormatTable;