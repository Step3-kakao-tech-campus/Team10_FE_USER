import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import CarwashDetailPage from './pages/CarwashDetailPage';
import ReservationPage from "./pages/ReservationPage";
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/carwashdetail" element={<CarwashDetailPage/>}></Route>
          <Route path="/reservation" element={<ReservationPage />}</Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
