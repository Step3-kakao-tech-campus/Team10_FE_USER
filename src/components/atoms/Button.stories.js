import { Button } from "./Button";

export default {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

export const Long = {
  args: {
    type: "long",
    label: "시작하기",
  },
};
