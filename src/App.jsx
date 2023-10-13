import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MainLayout } from "./layouts/MainLayout";
import { ReservationListPage } from "./pages/ReservationListPage";
import ReservationPage from "./pages/ReservationPage";
import CarwashDetailPage from "./pages/CarwashDetailPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route
            path="/reservationlist"
            element={<ReservationListPage />}></Route>
          <Route path="/carwashdetail" element={<CarwashDetailPage />}></Route>
          <Route path="/reservation" element={<ReservationPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
