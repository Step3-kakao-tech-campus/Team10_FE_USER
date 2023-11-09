import React, { useEffect } from "react";
const { kakao } = window;
const KakaoMap = ({ currentloc = [], mapdata = [], className }) => {
  useEffect(() => {
    console.log("currentloc, kakaomap", currentloc);
    console.log("mapdata, kakaopmap", mapdata);
    // Kakao 지도 API 스크립트 로드 여부 확인
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao 지도 API 스크립트가 로드되지 않았습니다.");
      return;
    }
    console.log("test");

    // Kakao 지도 API 초기화
    kakao.maps.load(() => {
      console.log("시작");
      const container = document.getElementById("map");
      console.log("container" + container);
      const options = {
        center: new kakao.maps.LatLng(37.499453350021426, 127.03316070814535),
        level: 7,
      };
      console.log("중간");
      const map = new kakao.maps.Map(container, options);
      console.log("map: " + map);
      console.log("종료");

      // 마커 아이콘 설정
      var imageSrc = "/myloca.png";
      var imageSize = new kakao.maps.Size(20, 30);
      var imageOption = { offset: new kakao.maps.Point(10, 25) };
      var markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      // 현재 위치 마커 추가
      var markerPosition = new kakao.maps.LatLng(
        currentloc.latitude,
        currentloc.longitude
      );
      var marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage, // 마커 이미지 설정
      });
      marker.setMap(map);

      // mapdata에 있는 장소 정보를 마커로 표시
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
          yAnchor: 1,
        });
      });
    });
  }, [currentloc, mapdata]);

  return <div id="map" className={`${className}`}></div>;
};

export default KakaoMap;