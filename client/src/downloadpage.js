import { useLocation  } from 'react-router-dom';

function DownloadPage() {

  const mlbData = useLocation();

  const dataRecieve = mlbData.state;

  if (!dataRecieve) {
    return <p>Not data.</p>;
  }

  return (
    <div>
      <h1>Download PAGE</h1>
      <p>BRING FILES OR LINKS TO DOWNLOAD</p>
      <button>Download VIDEO</button>
      <p>NAME FILE: {dataRecieve.name}</p>
      <p>URL LINK: {dataRecieve.source}</p>
    </div>
  );
}

export default DownloadPage;