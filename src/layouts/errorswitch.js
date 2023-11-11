export function getErrorDetail(error) {
  const errorResponse = error?.response?.data?.error;
  let statusCode = error?.response?.status;
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

    // ... (다른 에러 코드 처리 로직)

    default:
      errordetail = "알 수 없는 오류가 발생했습니다.";
      break;
  }

  return errordetail;
}
