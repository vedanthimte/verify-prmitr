import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VerifyCertificate from './components/VerifyCertificate';
import Navbar from './components/Navbar';

function App() {
  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<VerifyCertificate />} />
      </Routes>
    </Router>
  );
}

export default App;
