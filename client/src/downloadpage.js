import { useLocation  } from 'react-router-dom';
import React, { useState } from 'react';

function DownloadPage() {

  const mlbData = useLocation();

  const dataRecieve = mlbData.state;

  const [isDownloading, setIsDownloading] = useState(false);

  if (!dataRecieve) {
    return <p>Not data.</p>;
  }

  const handleDownload = async (fileUrl, name) => {
    setIsDownloading(true); // Start loading state
    console.log("File URL: " + fileUrl);
    console.log("File Name: " + name);

    const videoUrl = fileUrl; 
    const fileName = name + '.mp4';

    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob(); 
      
      const url = window.URL.createObjectURL(blob); // Creates a temporary local hidden address for the data
      const link = document.createElement('a');
      
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      
      link.click(); // Triggers the direct download
      
      // Clean up the DOM and memory
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Video download failed:', error);
      alert('Could not download video. See console for details.');
    } finally {
      setIsDownloading(false); // Stop loading state (runs even if it fails)
    }
  };

  return (
    <div class="container">
        {/*<div>NAME: {dataName}</div>*/}
        {/*<div>Source: {dataSource}</div>*/}
        <video src={dataRecieve.source} width="800" height="400" controls />
        <div class="item item-grow-1">Name: {dataRecieve.name}</div>
        {/* <div class="item item-grow-1">Source: {dataRecieve.source}</div> */}
        <div class="item item-grow-1">
            <button class="btn btn-lg btn-primary" onClick={() => handleDownload(dataRecieve.source, dataRecieve.name)}  disabled={isDownloading}>
               {isDownloading ? 'Downloading video...' : 'Download MP4 Video File'}
               </button>
        </div>

        {/*<div>Source: {jsonRes.data.originalData.source}</div>*/}
        {/*<div class="item item-grow-1">Item 1 (grow: 1)</div>
        <div class="item item-grow-2">Item 2 (grow: 2)</div>
        <div class="item item-grow-3">Item 3 (grow: 3)</div>
        <div class="item item-grow-3"><p>Message from server: {message}</p></div>*/}
    </div>
  );
}

export default DownloadPage;