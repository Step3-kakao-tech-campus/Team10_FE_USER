import TextInput from "../atoms/TextInput";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../atoms/Button";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../store/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(loginThunk(data))
      .then(unwrapResult)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error.error.message);
      });
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
  });

  const email = watch("email");
  const password = watch("password");

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  return (
    <div className="flex flex-col p-12 mt-40 border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-primary">로그인</h1>
      <form
        noValidate
        className="flex flex-col gap-4 my-20"
        onSubmit={handleSubmit(onSubmit)}>
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
          className="rounded-lg">
          로그인
        </Button>
        {errorMessage && (
          <small className="text-red-500" role="alert">
            {errorMessage}
          </small>
        )}
      </form>
      <Link to="/signup">회원가입</Link>
    </div>
  );
};

export default LoginForm;
