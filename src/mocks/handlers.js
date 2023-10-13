import { rest } from "msw";

const washlists = [
  {
    carwash_id: 1,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Carwas.jpg/250px-Carwas.jpg",
    name: "포세이돈워시",
    star: "3.3",
    address: "용봉동",
    distance: "1.3",
  },
  {
    carwash_id: 2,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Car_wash%2C_Tesco%2C_Emscote_Road%2C_Warwick_-_geograph.org.uk_-_1204540.jpg/220px-Car_wash%2C_Tesco%2C_Emscote_Road%2C_Warwick_-_geograph.org.uk_-_1204540.jpg",
    name: "용봉세차타운",
    star: "4.0",
    address: "용봉동",
    distance: "0.6",
  },
];
const currentpos = [];

export const handlers = [
  rest.get("/washlists", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(washlists));
  }),

  rest.post("/currentpos", (req, res, ctx) => {
    currentpos.push(JSON.stringify(req.body));
    console.log(currentpos);
    return res(ctx.status(200));
  }),
];
