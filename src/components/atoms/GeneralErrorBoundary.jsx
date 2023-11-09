import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export class GeneralErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {}

  render() {
    if (this.state.error) {
      const statusCode =
        this.state.error.status || this.state.error.response?.status;

      let errorPageURL = "/error";
      if (statusCode == 401) {
        console.log(statusCode);
        errorPageURL = "/login";
      } else {
        errorPageURL = "/";
        console.log(statusCode);
      }

      const contents =
        statusCode == 401
          ? "로그인이 필요한 페이지입니다. 로그인을 해 주세요."
          : "에러가 발생하였습니다. 잠시 후 다시 시도해주세요.";
      const buttontext = statusCode == 401 ? "로그인 페이지로" : "홈으로";

      return (
        <React.Fragment>
          <div className="mt-5 text-lg font-bold text-primary">{contents}</div>
          <div className="my-6">에러 코드 : {statusCode} </div>
          <div className="flex justify-end">
            <Button
              variant="long"
              onClick={() => this.props.navigate(errorPageURL)}
              className="px-4 py-2 mr-2 text-white rounded-md bg-primary"
            >
              {buttontext}
            </Button>
          </div>
          {/* Redirect를 사용해야 하나, class 컴포넌트에서는 이렇게 state를 이용해야 합니다. */}
        </React.Fragment>
      );
    }

    // 에러가 없을 때는 자식 컴포넌트를 정상적으로 렌더링합니다.
    return this.props.children;
  }
}
