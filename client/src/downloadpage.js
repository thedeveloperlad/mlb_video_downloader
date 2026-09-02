import { useLocation  } from 'react-router-dom';

function DownloadPage() {

  const mlbData = useLocation();

  const dataRecieve = mlbData.state;

  if (!dataRecieve) {
    return <p>Not data.</p>;
  }

  return (
    <div class="container">
        {/*<div>NAME: {dataName}</div>*/}
        {/*<div>Source: {dataSource}</div>*/}
        <video src={dataRecieve.source} width="800" height="400" controls />
        <div class="item item-grow-1">Name: {dataRecieve.name}</div>
        {/* <div class="item item-grow-1">Source: {dataRecieve.source}</div> */}
        <div class="item item-grow-1">
          <a href={dataRecieve.source} download={dataRecieve.name+".mp4"}>
            <button class="btn btn-lg btn-primary"> Download Video File </button>
          </a>
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