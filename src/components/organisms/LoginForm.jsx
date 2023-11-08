import TextInput from "../atoms/TextInput";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../apis/user";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../atoms/Button";
import { useState } from "react";
import { setLocalStorageWithExp } from "../../utils/localStorage";

const LoginForm = () => {
  const [loginError, setLoginError] = useState(""); // State to hold login errors
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data) => {
      return login(data);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
  });

  return (
    <div className="flex flex-col p-12 mt-40 border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-primary">로그인</h1>
      <form
        noValidate
        className="flex flex-col gap-4 my-20"
        onSubmit={handleSubmit((data) => {
          mutation.mutate(data, {
            onSuccess: (response) => {
              console.log(response);
              console.log(data);
              localStorage.setItem("token", response.headers.authorization); // 토큰 저장
              navigate("/");
            },
            onError: (error) => {
              if (error.response?.data?.error) {
                setLoginError(
                  <>
                    <div>오류: {error.response?.data?.error?.message}</div>
                    <div>아이디 또는 비밀번호를 다시 확인해주세요.</div>
                  </>
                );
              } else {
                setLoginError(
                  "로그인에 실패했습니다. 아이디 또는 비밀번호를 다시 확인해주세요."
                );
              }
            },
          });
        })}
      >
        <TextInput
          type="email"
          placeholder="이메일"
          {...register("email", {
            required: "이메일은 필수 입력입니다.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "이메일 형식에 맞지 않습니다.",
            },
          })}
        />
        {errors.email && (
          <small className="text-red-500" role="alert">
            {errors.email.message}
          </small>
        )}
        <TextInput
          type="password"
          placeholder="비밀번호"
          {...register("password", {
            required: "비밀번호는 필수 입력입니다.",
            minLength: {
              value: 8,
              message: "8자 이상 입력해주세요.",
            },
            maxLength: {
              value: 20,
              message: "20자 이하로 입력해주세요.",
            },
          })}
        />
        {errors.password && (
          <small className="text-red-500" role="alert">
            {errors.password.message}
          </small>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="long"
          className="rounded-lg"
        >
          로그인
        </Button>
        {loginError && (
          <p className="mt-4 text-sm text-center text-red-600">{loginError}</p>
        )}
      </form>
      <Link to="/signup">회원가입</Link>
    </div>
  );
};

export default LoginForm;
