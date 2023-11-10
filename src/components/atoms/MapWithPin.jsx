import { useEffect } from "react";

const MapWithPin = ({ lat, lng, text, className }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=" +
      import.meta.env.VITE_KAKAOMAP_API_KEY +
      "&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(lat, lng),
          level: 3,
        };
        const map = new kakao.maps.Map(container, options);
        const position = new kakao.maps.LatLng(lat, lng);

        const iwContent = `
          <div style="
            position: relative;
            padding: 5px 10px;
            background: #0098FF;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            font-size: 12px;
            color: #FFFFFF;
            text-align: center;
          ">
            ${text}
            <div style="
              position: absolute;
              left: 50%;
              bottom: -8px; /* Half the height of the arrow */
              margin-left: -8px; /* Half the width of the arrow */
              width: 0;
              height: 0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-top: 8px solid #0098FF;
            "></div>
          </div>
        `;

        const customOverlay = new kakao.maps.CustomOverlay({
          map: map,
          position: position,
          content: iwContent,
          yAnchor: 1,
        });
      });
    };
  }, [lat, lng, text]); // Dependencies should be declared here

  return <div id="map" className={`h-72 rounded-3xl ${className}`}></div>;
};

export default MapWithPin;
