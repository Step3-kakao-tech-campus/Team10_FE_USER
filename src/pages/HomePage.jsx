import { Suspense } from "react";
import HomeTemplate from "../components/templates/HomeTemplate";

export const HomePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeTemplate location={location} />
    </Suspense>
  );
};
