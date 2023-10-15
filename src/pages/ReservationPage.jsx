import KakaoMap from "../components/atoms/KakaoMap";
import { Bottomsheet } from "../components/atoms/Bottomsheet";
import StoreItem from "../components/molecules/StoreItem";
import { Input } from "../components/atoms/Input";
import { useEffect, useState } from "react";
import { Button } from "../components/atoms/Button";
import { Badge } from "../components/atoms/Badge";
import DualBottomsheet from "../components/atoms/DualBottomsheet";

const ReservationPage = () => {
  const [washlists, setWashlists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/washlists")
      .then((res) => res.json())
      .then((data) => {
        setWashlists(data);
        setLoading(false);
      });
  }, []);

  const currentpos = [243, 45];
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch("currentpos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: currentpos,
    });
  };

  return (
    <div>
      <div className="flex items-end w-screen h-screen gap-0 bg-white">
        <KakaoMap className="fixed absolute left-0 z-0 w-screen h-screen" />
        <DualBottomsheet className="fixed left-0 z-10">
          <Bottomsheet className="z-20 flex flex-col h-full gap-3 overflow-y-scroll">
            <Input placeholder="검색"></Input>
            <div className="flex flex-row gap-2">
              <Badge label="하부세차" />
              <Badge label="스노우폼" />
            </div>
            {washlists &&
              washlists.map((item, index) => {
                return (
                  <StoreItem
                    key={index}
                    imgsrc={item.image}
                    storename={item.name}
                    starcount={item.star}
                    reviewcount="0"
                    priceinfo="15000/60분"
                    distance={item.distance}
                  />
                );
              })}
            <Button
              type="small"
              label="재검색"
              className="z-20"
              onClick={handleSubmit}
            />
          </Bottomsheet>
        </DualBottomsheet>
      </div>
    </div>
  );
};

export default ReservationPage;
