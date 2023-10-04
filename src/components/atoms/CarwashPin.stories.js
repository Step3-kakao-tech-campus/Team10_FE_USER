import { CarwashPin } from "./CarwashPin";

export default {
  title: "Atoms/CarwashPin",
  component: CarwashPin,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const defaultpin = {
  args: {
    selected: true,
    picurl: "",
  },
};
