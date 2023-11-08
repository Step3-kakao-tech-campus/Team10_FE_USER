import { useEffect } from "react";

const { kakao } = window;

const KakaoMap = ({ currentloc = [], mapdata = [], className }) => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(
        currentloc.latitude - 0.04,
        currentloc.longitude
      ),
      level: 7,
    };
    const map = new kakao.maps.Map(container, options);

    var imageSrc = "/myloca.png";
    var imageSize = new kakao.maps.Size(20, 30);
    var imageOption = { offset: new kakao.maps.Point(10, 25) };
    var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );
    var markerPosition = new kakao.maps.LatLng(
      currentloc.latitude,
      currentloc.longitude
    );
    var marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage, // 마커이미지 설정
    });
    marker.setMap(map);

    mapdata.forEach((el) => {
      const position = new kakao.maps.LatLng(
        el.location.latitude,
        el.location.longitude
      );

      const iwContent = `
      <div style="
        position: relative;
        bottom: -16px; 
        display: inline-block;
        padding: 5px 10px;
        background: #0098FF;
        border-radius: 8px;
        
        font-size: 12px;
        color: #FFFFFF;
        text-align: center;
      ">
        ${el?.name}
        <div style="
          position: absolute;
          left: 50%;
          bottom: -8px;
          margin-left: -8px; 
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 10px solid #0098FF; 
        "></div>
      </div>
    `;

      const customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        position: position,
        content: iwContent,
        yAnchor: 1, // yAnchor 값 정확한 위치가 맞는지 확인  필요
      });
    });
  }, [currentloc, mapdata]);

  return <div id="map" className={`${className}`}></div>;
};

export default KakaoMap;
