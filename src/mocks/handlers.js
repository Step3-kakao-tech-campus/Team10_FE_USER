import { rest } from "msw";
import carwashes_nearby from "./apis/carwashes_nearby";
import reservations from "./apis/reservations";
const currentpos = [];

export const handlers = [
  rest.get("/carwashes/nearby", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(carwashes_nearby));
  }),
  rest.get("/reservations", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(reservations));
  }),

  rest.post("/currentpos", (req, res, ctx) => {
    currentpos.push(JSON.stringify(req.body));
    console.log(currentpos);
    return res(ctx.status(200));
  }),
];
