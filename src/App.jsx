import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MainLayout } from "./layouts/MainLayout";
import { ReservationListPage } from "./pages/ReservationListPage";
import ReservationPage from "./pages/ReservationPage";
import CarwashDetailPage from "./pages/CarwashDetailPage";
import BaySelectionPage from "./pages/BaySelectionPage";
import SchedulePage from "./pages/SchedulePage";
import ReservationHistoryPage from "./pages/ReservationHistoryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route
            path="/reservationlist"
            element={<ReservationListPage />}
          ></Route>
          <Route path="/carwashdetail" element={<CarwashDetailPage />}></Route>
          <Route path="/reservation" element={<ReservationPage />}></Route>
          <Route path="/bayselection" element={<BaySelectionPage />}></Route>
          <Route path="/schedule" element={<SchedulePage />}></Route>
          <Route path="/history" element={<ReservationHistoryPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
