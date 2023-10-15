import { useEffect } from "react";
const { kakao } = window;

export const MapWithPin = ({ lat, lng, text, className }) => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const position = new kakao.maps.LatLng(lat, lng);
    const iwContent = '<div style="padding:5px;">' + text + "</div>";

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
  }, []);

  return <div id="map" className={`h-72 rounded-3xl ${className}`}></div>;
};
