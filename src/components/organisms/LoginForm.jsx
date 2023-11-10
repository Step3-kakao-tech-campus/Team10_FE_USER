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
        if (error.error.code === "1001") {
          if (error.error.message.email) {
            setErrorMessage("유효하지 않은 이메일입니다.");
          } else if (error.error.message.password) {
            setErrorMessage(
              "비밀번호는 영소문자, 숫자, 특수문자를 포함해야합니다. 공백은 포함하지 않습니다"
            );
          }
        } else if (error.error.code === "1201") {
          setErrorMessage("잘못된 비밀번호입니다.");
        } else if (error.error.code === "1301") {
          setErrorMessage("존재하지 않는 이메일입니다.");
        }
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
    <div className="flex flex-col p-12 my-10 border border-gray-300 rounded-lg shadow-md">
      <div className="text-2xl font-bold text-center text-primary">로그인</div>
      <form
        noValidate
        className="flex flex-col gap-4 my-20"
        onSubmit={handleSubmit(onSubmit)}
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
        {errorMessage && (
          <small className="text-red-500" role="alert">
            {errorMessage}
          </small>
        )}
        <Link
          to="/signup"
          className="text-primary font-semibold underline mt-8"
        >
          회원가입
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
