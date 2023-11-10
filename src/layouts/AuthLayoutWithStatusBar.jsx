import { Outlet, useNavigate } from "react-router-dom";
import StatusBar from "../components/atoms/StatusBar";
import { useDispatch } from "react-redux";

const AuthLayoutWithStatusBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserInfoThunk())
      .then(unwrapResult)
      .catch(() => {
        navigate("/login");
      });
  }, []);

  return (
    <>
      <StatusBar />
      <main className="p-4 mt-14">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayoutWithStatusBar;
