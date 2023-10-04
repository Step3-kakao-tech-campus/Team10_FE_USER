import StoreItem from "./StoreItem";

export default {
  title: "Molecules/StoreItem",
  component: StoreItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const defaultStoreItem = {
  args: {
    imgsrc: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Carwas.jpg",
    storename: "포세이돈워시",
    starcount: "2.4",
    reviewcount: "35",
    priceinfo: "15,000원/60분",
    distance: 1.3,
  },
};
