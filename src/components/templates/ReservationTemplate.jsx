import KakaoMap from "../atoms/KakaoMap";
import { Bottomsheet } from "../atoms/Bottomsheet";
import StoreItem from "../molecules/StoreItem";
import { useEffect, useState } from "react";
import { Button } from "../atoms/Button";
import { Badge } from "../atoms/Badge";
import DualBottomsheet from "../atoms/DualBottomsheet";
import { carwashesNearby } from "../../apis/carwashes";
import { useSuspenseQuery } from "@tanstack/react-query";

const ReservationTemplate = () => {
  const [washlists, setWashlists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [keypoints, setKeypoints] = useState([]);

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
    queryKey: ["getcarwashes", location], // add location to the dependency list to re-run query if location changes
    queryFn: () => carwashesNearby(location), // Pass location to the getcarwashes_nearby function
    enabled: !!location.latitude && !!location.longitude, // Only run the query when we have both latitude and longitude
  });

  useEffect(() => {
    if (data) {
      setWashlists(data);
    }
  }, [data]);

  const handleBadgeClick = (value) => {
    console.log(keypoints);
    setKeypoints((prevKeypoints) =>
      prevKeypoints.includes(value)
        ? prevKeypoints.filter((point) => point !== value)
        : [...prevKeypoints, value]
    );
  };
  console.log(location);
  return (
    <div>
      <div className="flex items-end w-screen h-screen gap-0 bg-white">
        <KakaoMap className="fixed absolute left-0 z-0 w-screen h-screen" />
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
  );
};

export default ReservationTemplate;
