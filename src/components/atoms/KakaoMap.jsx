import { useEffect } from "react";

const { kakao } = window;

const markerdata = [
  {
    title: "콜드스퀘어",
    lat: 37.62197524055062,
    lng: 127.16017523675508,
  },
  {
    title: "하남돼지집",
    lat: 37.620842424005616,
    lng: 127.1583774403176,
  },
];

const KakaoMap = ({ className }) => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.6205, 127.158),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    markerdata.forEach((el) => {
      new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(el.lat, el.lng),
        title: el.title,
      });
    });
  }, []);

  return <div id="map" className={`${className}`}></div>;
};

export default KakaoMap;
