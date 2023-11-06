import { useEffect } from "react";
const { kakao } = window;

const myloca = { lat: 35.176, lng: 126.9 };
const carwashloca = [
  {
    id: 2,
    name: "하이세차장",
    image:
      "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/b214edfd-a3b7-4eb0-aaef-9dd4705ca24e",
    location: {
      id: 18,
      place: "새로운 이름",
      address: "새로운 주소",
      latitude: 35.1,
      longitude: 126.552,
    },
    distance: 2513,
    rate: 5.0,
    price: 2000,
  },
  {
    id: 3,
    name: "무슨무슨세차장",
    image:
      "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/b214edfd-a3b7-4eb0-aaef-9dd4705ca24e",
    location: {
      id: 18,
      place: "새로운 이름",
      address: "새로운 주소",
      latitude: 35.1,
      longitude: 126.548,
    },
    distance: 4189,
    rate: 5.0,
    price: 2000,
  },
];

export const MapWithPins = (className) => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(myloca.lat, myloca.lng),
      level: 4,
    };
    const map = new kakao.maps.Map(container, options);
    carwashloca.forEach((el) => {
      const position = new kakao.maps.LatLng(
        el.location.latitude,
        el.location.longitude
      );
      const iwContent = '<div style="padding:5px;">' + el?.name + "</div>";

      new kakao.maps.Marker({
        map: map,
        position: position,
      });

      new kakao.maps.InfoWindow({
        map: map,
        position: position,
        content: iwContent,
        removable: false,
      });
    });
  }, []);

  return <div id="map" className={`h-72 rounded-3xl ${className}`}></div>;
};
