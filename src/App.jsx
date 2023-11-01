import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MainLayout } from "./layouts/MainLayout";

import ReservationPage from "./pages/ReservationPage";
import CarwashDetailPage from "./pages/CarwashDetailPage";
import BaySelectionPage from "./pages/BaySelectionPage";
import SchedulePage from "./pages/SchedulePage";
import ReservationHistoryPage from "./pages/ReservationHistoryPage";
import PaymentResultPage from "./pages/PaymentResultPage";
import ReviewPostPage from "./pages/ReviewPostPage";
import PaymentPage from "./pages/PaymentPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/reservation" element={<ReservationPage />}></Route>
          <Route path="/history" element={<ReservationHistoryPage />}></Route>
        </Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route
          path="/carwashdetail/:carwashId"
          element={<CarwashDetailPage />}
        ></Route>
        <Route
          path="/bayselection/:carwashId"
          element={<BaySelectionPage />}
        ></Route>
        <Route
          path="/schedule/:carwashId/:bayId"
          element={<SchedulePage />}
        ></Route>
        <Route path="/payment" element={<PaymentPage />}></Route>
        <Route
          path="/paymentresult/:reservationId"
          element={<PaymentResultPage />}
        ></Route>
        <Route path="/reviewpost" element={<ReviewPostPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
