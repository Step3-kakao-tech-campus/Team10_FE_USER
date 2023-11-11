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
    console.log(this.state.error);

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

      const errorResponse = this.state.error?.response?.data?.error;
      let errordetail = "";

      switch (statusCode) {
        case 400:
          if (errorResponse?.code == "1001") {
            errordetail = "요청에 대한 유효성 검증에 실패하였습니다.";
          } else if (errorResponse?.code == "1002") {
            errordetail = "잘못된 요청을 전달하였습니다.";
          } else if (errorResponse?.code == "1003") {
            errordetail = "필수적인 전달요소가 누락되었습니다.";
          } else if (errorResponse?.code == "1004") {
            errordetail = "중복된 리소스가 전달되었습니다.";
          }

          break;

        case 401:
          if (errorResponse?.code == "1201") {
            errordetail = "인증되지 않았습니다.";
          } else if (errorResponse?.code == "1202") {
            errordetail = "해당 리소스에 대한 권한이 부족합니다.";
          }
          break;

        case 403:
          if (errorResponse?.code == "1101") {
            errordetail = "역할 기반 접근제어 오류가 발생하였습니다.";
          } else if (errorResponse?.code == "1102") {
            errordetail = "리소스 접근 권한 오류가 발생하였습니다.";
          }
          break;
        case 404:
          if (errorResponse?.code == "1301") {
            errordetail = "존재하지 않는 리소스에 접근을 시도하고 있습니다.";
          }
          break;
        case 500:
          if (errorResponse?.code == "2000") {
            errordetail = "서버 내부 오류가 발생했습니다.";
          }
          break;
        default:
          errordetail = { statusCode };
      }

      const contents =
        statusCode == 401
          ? "로그인이 필요한 페이지입니다. 로그인을 해 주세요."
          : "에러가 발생하였습니다. 잠시 후 다시 시도해주세요.";
      const buttontext = statusCode == 401 ? "로그인 페이지로" : "홈으로";

      return (
        <React.Fragment>
          <div className="mt-5 text-lg font-bold text-primary">{contents}</div>
          <div className="my-6">에러 원인 : {errordetail} </div>
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
