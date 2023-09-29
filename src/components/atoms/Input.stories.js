import { Input } from "./Input";

export default {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const email = {
  args: {
    placeholder: "이메일",
  },
};

export const password = {
  args: {
    placeholder: "비밀번호",
  },
};
