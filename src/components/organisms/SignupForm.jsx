import TextInput from "../atoms/TextInput";
import { Button } from "../atoms/Button";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signup, checkEmail } from "../../apis/user";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const SignupForm = () => {
  const [emailValid, setEmailValid] = useState(false); // Changed default to false
  const [emailError, setEmailError] = useState("");
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [signupError, setSignupError] = useState("");

  const mutation = useMutation({
    mutationFn: (data) => {
      signup(data);
    },
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, touchedFields, dirtyFields },
  } = useForm({
    mode: "onChange",
  });

  const PATTERNS = {
    username: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,20}$/,
    email: /\S+@\S+\.\S+/,
    password: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,24}$/,
  };

  const MESSAGES = {
    username: {
      required: "닉네임을 입력해주세요.",
      pattern: "닉네임은 2자 이상 20자 이하, 영어 또는 한글로 입력해주세요.",
    },
    email: {
      required: "이메일을 입력해주세요.",
      pattern: "이메일 형식에 맞지 않습니다.",
    },
    password: {
      required: "비밀번호를 입력해주세요.",
      pattern:
        "비밀번호는 영문, 숫자, 특수기호 조합 8자리 이상으로 입력해주세요.",
    },
    passwordConfirm: {
      required: "비밀번호를 입력해주세요.",
      mismatch: "비밀번호가 일치하지 않습니다.",
    },
    tel: {
      required: "전화번호를 입력해주세요.",
    },
  };

  const onEmailCheck = async () => {
    const email = getValues("email");
    if (!email) {
      setEmailError("이메일을 입력해주세요.");
      return;
    }

    setCheckingEmail(true);
    setEmailError("");
    clearErrors("email");

    try {
      const response = await checkEmail(email);
      setEmailValid(true);
      setEmailError("사용 가능한 이메일입니다.");
    } catch (error) {
      setEmailValid(false);
      const errorMessage =
        error.response?.data.error.message || "에러가 발생했습니다.";
      setEmailError(errorMessage);
      -setError("email", { type: "manual", message: errorMessage });
    } finally {
      setCheckingEmail(false);
    }
  };

  const onSubmit = async (data) => {
    if (!emailValid) {
      setError("email", {
        type: "manual",
        message: "이메일 중복확인을 해주세요.",
      });
      return;
    }
    setSignupError(""); // Clear previous errors

    try {
      await signup(data);
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data.error.message ||
        "회원가입 중 에러가 발생했습니다.";
      setSignupError(errorMessage); // Set the new error message
    }
  };

  return (
    <div className="flex flex-col gap-6 p-10 my-20 bg-white border border-gray-300 rounded-lg shadow-md ">
      <div className="text-2xl font-bold text-center text-primary">
        회원가입
      </div>
      <form
        noValidate
        className="flex flex-col gap-4 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <TextInput
            type="text"
            placeholder="닉네임"
            {...register("username", {
              required: MESSAGES.username.required,
              pattern: {
                value: PATTERNS.username,
                message: MESSAGES.username.pattern,
              },
            })}
          />
        </div>
        {errors.username && (
          <small className="text-red-500" role="alert">
            {errors.username.message}
          </small>
        )}

        <div className="flex gap-4">
          <div className="flex justify-between gap-2">
            <TextInput
              type="email"
              placeholder="이메일"
              className="w-auto"
              {...register("email", {
                required: MESSAGES.email.required,
                pattern: {
                  value: PATTERNS.email,
                  message: MESSAGES.email.pattern,
                },
              })}
            />
            <Button
              type="button"
              variant="checkemail"
              onClick={onEmailCheck}
              disabled={checkingEmail}
            >
              {checkingEmail ? "확인 중..." : "중복체크"}
            </Button>
          </div>
        </div>
        {emailError && (
          <small className="text-red-500" role="alert">
            {emailError}
          </small>
        )}
        <TextInput
          type="password"
          placeholder="비밀번호"
          {...register("password", {
            required: MESSAGES.password.required,
            pattern: {
              value: PATTERNS.password,
              message: MESSAGES.password.pattern,
            },
          })}
        />
        {errors.password && (
          <small className="text-red-500" role="alert">
            {errors.password.message}
          </small>
        )}
        <TextInput
          type="password"
          placeholder="비밀번호 확인"
          {...register("passwordConfirm", {
            required: MESSAGES.passwordConfirm.required,
            validate: {
              check: (value) => {
                if (getValues("password") !== value) {
                  return MESSAGES.passwordConfirm.mismatch;
                }
              },
            },
          })}
        />
        {errors.passwordConfirm && (
          <small className="text-red-500" role="alert">
            {errors.passwordConfirm.message}
          </small>
        )}

        <TextInput
          type="tel"
          placeholder="전화번호"
          {...register("tel", {
            required: MESSAGES.tel.required,
          })}
        />
        {errors.tel && (
          <small className="text-red-500" role="alert">
            {errors.tel.message}
          </small>
        )}

        <Button
          type="submit"
          disabled={
            !emailValid ||
            Object.keys(errors).length > 0 ||
            isSubmitting ||
            Object.keys(touchedFields).length === 0 ||
            Object.keys(dirtyFields).length < Object.keys(register).length
          }
          variant="long"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md"
        >
          회원가입
        </Button>
        {signupError && (
          <div className="text-red-500" role="alert">
            {signupError}
          </div>
        )}
        <Link to="/login">로그인</Link>
      </form>
    </div>
  );
};

export default SignupForm;
