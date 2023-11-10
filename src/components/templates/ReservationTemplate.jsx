import KakaoMap from "../atoms/KakaoMap";
import { Bottomsheet } from "../atoms/Bottomsheet";
import StoreItem from "../molecules/StoreItem";
import { useEffect, useState } from "react";
import { Badge } from "../atoms/Badge";
import DualBottomsheet from "../atoms/DualBottomsheet";
import { carwashesSearch } from "../../apis/carwashes";
import { useSuspenseQuery } from "@tanstack/react-query";

const ReservationTemplate = () => {
  const initialKeypoints = [8, 9, 10, 11, 12, 13, 14];
  const [keypoints, setKeypoints] = useState(initialKeypoints);
  const [firstClick, setFirstClick] = useState(true);
  const [washlists, setWashlists] = useState([]);
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

  console.log("location", location);
  console.log("washlists", washlists);

  return (
    <div className="flex items-end w-screen h-screen gap-0 bg-white">
      <KakaoMap
        currentloc={location}
        mapdata={washlists?.data?.response}
        className="fixed left-0 z-0 w-screen h-screen"
      />

      <DualBottomsheet className="fixed left-0 z-10 bottom-20">
        <Bottomsheet className="z-20 flex flex-col h-full gap-3">
          <input
            type="text"
            id="search-bar"
            className="px-4 py-2 mx-4 mt-6 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary"
            placeholder="세차장 이름을 검색하세요"
            onChange={handleSearchChange}
            value={searchTerm}
          />
          <div className="flex flex-row gap-2 mx-4 my-2 overflow-x-auto flex-shrink-0">
            <Badge
              key="8"
              label="하부세차"
              onClick={() => {
                handleBadgeClick(8);
              }}
              className="whitespace-nowrap"
            />
            <Badge
              key="9"
              label="개러지형 독립공간"
              onClick={() => {
                handleBadgeClick(9);
              }}
              className="whitespace-nowrap"
            />
            <Badge
              key="10"
              label="야간조명"
              onClick={() => {
                handleBadgeClick(10);
              }}
              className="whitespace-nowrap"
            />
            <Badge
              key="11"
              label="100%수돗물"
              onClick={() => {
                handleBadgeClick(11);
              }}
              className="whitespace-nowrap"
            />
            <Badge
              key="12"
              label="휴게실"
              onClick={() => {
                handleBadgeClick(12);
              }}
              className="whitespace-nowrap"
            />
            <Badge
              key="13"
              label="에어컨"
              onClick={() => {
                handleBadgeClick(13);
              }}
              className="whitespace-nowrap"
            />
            <Badge
              key="14"
              label="발수코팅건"
              onClick={() => {
                handleBadgeClick(14);
              }}
              className="whitespace-nowrap"
            />
          </div>

          <div className="flex flex-col gap-4 mx-4 overflow-y-scroll">
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
  );
};

export default ReservationTemplate;
