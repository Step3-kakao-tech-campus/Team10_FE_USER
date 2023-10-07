import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import CarwashDetailPage from './pages/CarwashDetailPage';
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/carwashdetail" element={<CarwashDetailPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
