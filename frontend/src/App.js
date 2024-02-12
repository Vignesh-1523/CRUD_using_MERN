import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import Create from './pages/Create';
import Read from './pages/Read';
import Update from './pages/Update';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/add" element={<Add/>} />
        <Route path="/create" element={<Create/>} />
        <Route path="/" element={<Read/>}/>
        <Route path="/update" element={<Update/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
