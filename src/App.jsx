import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MainLayout } from "./layouts/MainLayout";
import Modal from "react-modal";
import ReservationPage from "./pages/ReservationPage";
import CarwashDetailPage from "./pages/CarwashDetailPage";
import BaySelectionPage from "./pages/BaySelectionPage";
import SchedulePage from "./pages/SchedulePage";
import ReservationHistoryPage from "./pages/ReservationHistoryPage";
import PaymentResultPage from "./pages/PaymentResultPage";
import ReviewPostPage from "./pages/ReviewPostPage";
import PaymentPage from "./pages/PaymentPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

Modal.setAppElement("#root");
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="reservation" element={<ReservationPage />} />
          <Route path="history" element={<ReservationHistoryPage />} />
          <Route
            path="carwashdetail/:carwashId"
            element={<CarwashDetailPage />}
          />
          <Route
            path="bayselection/:carwashId"
            element={<BaySelectionPage />}
          />
          <Route path="schedule/:carwashId/:bayId" element={<SchedulePage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route
            path="paymentresult/:reservationId"
            element={<PaymentResultPage />}
          />
          <Route path="reviewpost" element={<ReviewPostPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
