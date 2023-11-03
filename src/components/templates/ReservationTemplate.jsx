import KakaoMap from "../atoms/KakaoMap";
import { Bottomsheet } from "../atoms/Bottomsheet";
import StoreItem from "../molecules/StoreItem";
import { useEffect, useState } from "react";
import { Button } from "../atoms/Button";
import { Badge } from "../atoms/Badge";
import DualBottomsheet from "../atoms/DualBottomsheet";
import { carwashesNearby, carwashesSearch } from "../../apis/carwashes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MapWithPins } from "../atoms/MapWithPins";

const ReservationTemplate = () => {
  const initialKeypoints = [1, 2, 3];
  const [keypoints, setKeypoints] = useState(initialKeypoints);
  const [firstClick, setFirstClick] = useState(true);
  const [washlists, setWashlists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  const { data } = useSuspenseQuery({
    queryKey: [
      "getcarwashes",
      location.latitude,
      location.longitude,
      keypoints,
    ],
    queryFn: () =>
      carwashesSearch(keypoints, location.latitude, location.longitude),
    enabled: location.latitude != null && location.longitude != null,
  });
  useEffect(() => {
    if (data) {
      setWashlists(data);
    }
  }, [data]);

  const handleBadgeClick = (value) => {
    if (firstClick) {
      setKeypoints([value]);
      setFirstClick(false);
    } else {
      setKeypoints((prevKeypoints) =>
        prevKeypoints.includes(value)
          ? prevKeypoints.filter((point) => point !== value)
          : [...prevKeypoints, value]
      );
    }
  };
  console.log(keypoints);

  return (
    <div className="overflow-y-auto">
      <div>
        <div className="flex items-end w-screen h-screen gap-0 bg-white">
          <KakaoMap
            currentloc={location}
            mapdata={washlists?.data?.response}
            className="fixed left-0 z-0 w-screen h-screen"
          />
          <DualBottomsheet className="fixed left-0 z-10">
            <Bottomsheet className="z-20 flex flex-col h-full gap-3 overflow-y-scroll">
              <div className="flex flex-row gap-2">
                <Badge
                  key="1"
                  label="하부세차"
                  onClick={() => {
                    handleBadgeClick(1);
                  }}
                />
                <Badge
                  key="2"
                  label="폼건세차"
                  onClick={() => {
                    handleBadgeClick(2);
                  }}
                />
                <Badge
                  key="3"
                  label="온수세차"
                  onClick={() => {
                    handleBadgeClick(3);
                  }}
                />
              </div>
              {washlists?.data?.response &&
                washlists?.data?.response.map((item, index) => (
                  <StoreItem
                    key={index}
                    imgsrc={item.image}
                    storename={item.name}
                    starcount={item.star}
                    reviewcount="0"
                    priceinfo="15000/60분"
                    distance={item.distance}
                  />
                ))}
            </Bottomsheet>
          </DualBottomsheet>
        </div>
      </div>
    </div>
  );
};

export default ReservationTemplate;
