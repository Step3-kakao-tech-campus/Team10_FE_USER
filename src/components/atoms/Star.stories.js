import Star from "./Star";

export default {
  title: "Atoms/Star",
  component: Star,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const defaultstar = {
  args: {
    starcount: "0.0",
    reviewcount: "0.0",
  },
};
