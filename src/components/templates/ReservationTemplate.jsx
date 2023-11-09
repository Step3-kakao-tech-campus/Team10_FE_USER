import KakaoMap from "../atoms/KakaoMap";
import { Bottomsheet } from "../atoms/Bottomsheet";
import StoreItem from "../molecules/StoreItem";
import { useEffect, useState } from "react";
import { Badge } from "../atoms/Badge";
import DualBottomsheet from "../atoms/DualBottomsheet";
import { carwashesSearch } from "../../apis/carwashes";
import { useSuspenseQuery } from "@tanstack/react-query";

const ReservationTemplate = () => {
  const initialKeypoints = [1, 2, 3];
  const [keypoints, setKeypoints] = useState(initialKeypoints);
  const [firstClick, setFirstClick] = useState(true);
  const [washlists, setWashlists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({
    latitude: 35.14,
    longitude: 126.9,
  });
  const [searchTerm, setSearchTerm] = useState("");

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
    enabled: location.latitude !== null && location.longitude !== null,
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredWashlists = searchTerm
    ? washlists?.data?.response.filter((item) =>
        item?.name.includes(searchTerm)
      )
    : washlists?.data?.response;

  return (
    <div className="overflow-y-auto">
      <div>
        <div className="flex items-end w-screen h-screen gap-0 bg-white">
          <KakaoMap
            currentloc={location}
            mapdata={washlists?.data?.response}
            className="fixed left-0 z-0 w-screen h-screen"
          />
          <DualBottomsheet className="fixed left-0 z-10 bottom-16">
            <Bottomsheet className="z-20 flex flex-col h-full gap-3 overflow-y-scroll">
              <input
                type="text"
                id="search-bar"
                className="px-4 py-2 mx-4 mt-6 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary"
                placeholder="세차장 이름을 검색하세요!"
                onChange={handleSearchChange}
                value={searchTerm}
              />
              <div className="flex flex-row gap-2 mx-4 ">
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
              <hr className="" />{" "}
              <div className="flex flex-col gap-4 mx-4">
                {filteredWashlists?.length > 0 ? (
                  filteredWashlists.map((item, index) => (
                    <StoreItem
                      key={index}
                      carwashId={item.id}
                      imgsrc={item.image}
                      storename={item.name}
                      starcount={item.rate}
                      priceinfo={item.price}
                      distance={item.distance}
                    />
                  ))
                ) : (
                  <p className="text-gray-600">검색된 세차장이 없습니다.</p>
                )}
              </div>
            </Bottomsheet>
          </DualBottomsheet>
        </div>
      </div>
    </div>
  );
};

export default ReservationTemplate;
