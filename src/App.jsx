import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MainLayout } from "./layouts/MainLayout";
import { ReservationListPage } from "./pages/ReservationListPage";
import { ReservationPage } from "./pages/ReservationPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/reservation" element={<ReservationPage />}></Route>
          <Route
            path="/reservationlist"
            element={<ReservationListPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
