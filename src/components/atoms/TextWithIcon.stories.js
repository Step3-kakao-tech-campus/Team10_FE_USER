import { TextWithIcon } from "./TextWithIcon";

export default {
  title: "Atoms/TextWithIcon",
  component: TextWithIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const defaultTWI = {
  args: {
    iconsrc: "TextWithIcon\\calendar.png",
    text: "2023/09/08",
  },
};
