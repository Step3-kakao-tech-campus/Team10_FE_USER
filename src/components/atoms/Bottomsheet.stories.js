import { Bottomsheet } from "./Bottomsheet";

export default {
  title: "Atoms/Bottomsheet",
  component: Bottomsheet,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],
};

export const withButton = {
  args: {
    children: "button",
  },
};
