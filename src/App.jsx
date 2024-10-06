import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SignatureGenerator from './components/SignatureGenerator';
import DrawSignature from './components/DrawSignature';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signature-generator" element={<SignatureGenerator />} />
            <Route path="/signature-draw" element={<DrawSignature />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
