import React from "react";
import { Input } from "../components/atoms/Input";
import { Button } from "../components/atoms/Button";

export const SignupPage = () => {
  return (
    <>
      <div className="flex min-h-screen place-items-center">
        <div>
          <div className="h-16 text-2xl font-semibold">회원가입</div>
          <div className="flex my-2">
            <Input placeholder="닉네임"></Input>
            <Button className="ml-4" type="small" label="중복체크"></Button>
          </div>
          <div className="flex my-2">
            <Input placeholder="이메일"></Input>
            <Button className="ml-4" type="small" label="중복체크"></Button>
          </div>
          <Input className="my-2" placeholder="비밀번호"></Input>
          <Input className="my-2" placeholder="비밀번호 확인"></Input>
          <Input className="my-2" placeholder="전화번호"></Input>
          <Button
            className="absolute left-0 bottom-6"
            label="회원가입"
          ></Button>
        </div>
      </div>
    </>
  );
};
