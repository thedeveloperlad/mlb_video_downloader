import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from './homepage';
import DownloadPage from './downloadpage';

function App()
{
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/download" element={<DownloadPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;