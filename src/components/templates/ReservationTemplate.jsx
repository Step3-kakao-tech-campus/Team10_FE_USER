import KakaoMap from "../atoms/KakaoMap";
import { Bottomsheet } from "../atoms/Bottomsheet";
import StoreItem from "../molecules/StoreItem";
import { useEffect, useState, useRef } from "react";
import { Badge } from "../atoms/Badge";
import DualBottomsheet from "../atoms/DualBottomsheet";
import { carwashesSearch } from "../../apis/carwashes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useDrag } from "react-use-gesture";
import TextInput from "../atoms/TextInput";

const ReservationTemplate = () => {
  const initialKeypoints = [];
  const [keypoints, setKeypoints] = useState(initialKeypoints);
  const [firstClick, setFirstClick] = useState(true);
  const [carwashList, setCarwashList] = useState([]);
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
      setCarwashList(data);
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

  const filteredCarwashList = searchTerm
    ? carwashList?.data?.response.filter((item) =>
        item?.name.includes(searchTerm)
      )
    : carwashList?.data?.response;

  const scrollContainerRef = useRef(null);

  const bindScroll = useDrag(
    (state) => {
      const [, y] = state.offset;
      state.event.stopPropagation();
    },
    {
      domTarget: scrollContainerRef,
      eventOptions: { passive: false },
    }
  );

  return (
    <div className="w-screen">
      <KakaoMap
        currentloc={location}
        mapdata={carwashList?.data?.response}
        className="fixed left-0 z-0 w-screen h-screen"
      />

      <DualBottomsheet className="fixed left-0 z-10">
        <Bottomsheet className="z-20 flex flex-col h-full gap-4 p-4">
          <TextInput
            type="text"
            id="search-bar"
            placeholder="검색할 세차장 이름을 입력하세요"
            className="p-4"
            onChange={handleSearchChange}
            value={searchTerm}
          />
          <div className="flex gap-2 pb-8 overflow-x-auto scrollbar-hide">
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
              label="100% 수돗물"
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

          <div
            className="grid gap-4 overflow-y-scroll pb-28"
            ref={scrollContainerRef}
            {...bindScroll()}>
            {filteredCarwashList?.length > 0 ? (
              filteredCarwashList.map((item, index) => (
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
