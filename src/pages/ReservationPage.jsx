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
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [keypoints, setKeypoints] = useState([1, 2, 3]);

  useEffect(() => {
    // Fetch car wash list
    setLoading(true);
    fetch("/carwashes/nearby")
      .then((res) => res.json())
      .then((data) => {
        setWashlists(data);
        setLoading(false);
      });

    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
    handleSubmit();
  }, []);

  const handleSubmit = (event) => {
    setLoading(true);
    fetch("carwashespost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...location, keypoints }),
    });
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;
  if (!washlists) return null;

  const handleBadgeClick = (value) => {
    console.log(keypoints);
    setKeypoints((prevKeypoints) =>
      prevKeypoints.includes(value)
        ? prevKeypoints.filter((point) => point !== value)
        : [...prevKeypoints, value]
    );
    console.log(keypoints);
  };

  return (
    <div>
      <div className="flex items-end w-screen h-screen gap-0 bg-white">
        <KakaoMap className="fixed absolute left-0 z-0 w-screen h-screen" />
        <DualBottomsheet className="fixed left-0 z-10">
          <Bottomsheet className="z-20 flex flex-col h-full gap-3 overflow-y-scroll">
            <Input placeholder="검색"></Input>
            <div className="flex flex-row gap-2">
              <Badge
                key="1"
                label="하부세차"
                onClick={() => {
                  handleBadgeClick(1);
                  handleSubmit();
                }}
              />
              <Badge
                key="2"
                label="폼건세차"
                onClick={() => {
                  handleBadgeClick(2);
                  handleSubmit();
                }}
              />
              <Badge
                key="3"
                label="온수세차"
                onClick={() => {
                  handleBadgeClick(3);
                  handleSubmit();
                }}
              />
            </div>
            {washlists.response &&
              washlists.response.map((item, index) => (
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
