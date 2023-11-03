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

    const iwContent = `
      <div style="
        padding: 5px 10px;
        background: #0098FF;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        font-size: 12px;
        color: #FFFFFF;
        text-align: center;
      ">
        ${text}
      </div>
    `;

    const customOverlay = new kakao.maps.CustomOverlay({
      map: map,
      position: position,
      content: iwContent,
      yAnchor: 1,
    });
  }, [lat, lng, text]);

  return <div id="map" className={`h-72 rounded-3xl ${className}`}></div>;
};

export default MapWithPin;
