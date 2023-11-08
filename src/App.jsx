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
import PaymentWaitingPage from "./pages/PaymentWaitingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";

Modal.setAppElement("#root");
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
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
          <Route path="paymentwaiting" element={<PaymentWaitingPage />} />
          <Route path="paymentresult" element={<PaymentResultPage />} />
          <Route path="reviewpost" element={<ReviewPostPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
