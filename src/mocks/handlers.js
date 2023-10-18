import { rest } from "msw";
import carwashes_nearby from "./apis/carwashes_nearby";
import carwashes_search from "./apis/carwashes_search";
import carwashes_introduction from "./apis/carwashes_introduction";
import carwashes_reviews from "./apis/carwashes_reviews";
import reviews from "./apis/reviews";
import carwashes_bays from "./apis/carwashes_bays";
import reservations from "./apis/reservations";
import reservations_currentstatus from "./apis/reservations_currentstatus";
import reservation_recent from "./apis/reservations_recent";
import reservations_payment from "./apis/reservations_payment";

const currentpos = [];
export const handlers = [
  rest.get("/carwashes/nearby", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(carwashes_nearby));
  }),
  rest.get("/carwashes/search", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(carwashes_search));
  }),

  rest.get("/carwashes/introduction", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(carwashes_introduction));
  }),

  rest.get("/carwashes/reviews", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(carwashes_reviews));
  }),
  rest.get("/reviews", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(reviews));
  }),
  rest.get("/carwashes/bays", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(carwashes_bays));
  }),

  rest.get("/reservations", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(reservations));
  }),
  rest.get("/reservations/currentstaus", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(reservations_currentstatus));
  }),
  rest.get("/reservations/recent", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(reservation_recent));
  }),
  rest.get("/reservations/payment", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(reservations_payment));
  }),

  rest.post("/carwashespost", (req, res, ctx) => {
    currentpos.push(JSON.stringify(req.body));
    console.log(currentpos);
    return res(ctx.status(200));
  }),
];
