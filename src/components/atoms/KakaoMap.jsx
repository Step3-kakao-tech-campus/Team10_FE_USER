import { useEffect } from "react";

const { kakao } = window;

const KakaoMap = ({ currentloc = [], mapdata = [], className }) => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(currentloc.latitude, currentloc.longitude),
      level: 7,
    };
    const map = new kakao.maps.Map(container, options);

    mapdata.forEach((el) => {
      var imageSize = new kakao.maps.Size(64, 69);
      var imageOption = { offset: new kakao.maps.Point(27, 100) };
      var iwContent = '<div style="padding:5px;">' + el?.name + "</div>";
      var markerImage = new kakao.maps.MarkerImage(
        el.image,
        imageSize,
        imageOption
      );
      // 사진 넣고 싶으면 주석 부분 해제하면 됨
      // var marker = new kakao.maps.Marker({
      //   map: map,
      //   position: new kakao.maps.LatLng(
      //     el.location.latitude,
      //     el.location.longitude
      //   ),
      //   title: el.title,
      //   image: markerImage,
      // });
      var infowindow = new kakao.maps.InfoWindow({
        map: map,
        position: new kakao.maps.LatLng(
          el.location.latitude,
          el.location.longitude
        ),
        content: iwContent,
        removable: false,
      });
      infowindow.setMap(map);
      // marker.setMap(map);
    });
  }, [mapdata]);

  return <div id="map" className={`${className}`}></div>;
};

export default KakaoMap;
