import ReservationItem from "../molecules/ReservationItem";

const ReservationHistoryTemplate = () => {
  return (
    <div className="grid gap-10">
      <div className="text-2xl font-bold">예약내역</div>
      <div className="grid gap-2">
        <div className="font-semibold ">현재 진행중인 세차</div>
        <ReservationItem
          imgsrc="https://i.namu.wiki/i/yxy4APuvvDp8JyH0Xvd_tWsL--BXEolkQT_PFSbi3H8YOA_1nn2dXm_DzYdP9x8ODt6BNp00ayCGOHT4VR-o2eyUO50iizlQXYG_g61MIIi3Nl3SDZw1EXnjg3eDZmxhxghsPo9BmVw205aYNk_EZg.webp"
          reservetime="23/10/31 17:00~18:00"
          bayname="용봉셀프세차 : 베이1"
          priceinfo="10,000원"
        />
      </div>
      <div className="grid gap-2">
        <div className="font-semibold ">예정된 세차</div>
        <ReservationItem
          imgsrc="https://i.namu.wiki/i/yxy4APuvvDp8JyH0Xvd_tWsL--BXEolkQT_PFSbi3H8YOA_1nn2dXm_DzYdP9x8ODt6BNp00ayCGOHT4VR-o2eyUO50iizlQXYG_g61MIIi3Nl3SDZw1EXnjg3eDZmxhxghsPo9BmVw205aYNk_EZg.webp"
          reservetime="23/10/31 17:00~18:00"
          bayname="용봉셀프세차 : 베이1"
          priceinfo="10,000원"
          buttontype="cancel"
        />
        <ReservationItem
          imgsrc="https://i.namu.wiki/i/yxy4APuvvDp8JyH0Xvd_tWsL--BXEolkQT_PFSbi3H8YOA_1nn2dXm_DzYdP9x8ODt6BNp00ayCGOHT4VR-o2eyUO50iizlQXYG_g61MIIi3Nl3SDZw1EXnjg3eDZmxhxghsPo9BmVw205aYNk_EZg.webp"
          reservetime="23/10/31 17:00~18:00"
          bayname="용봉셀프세차 : 베이1"
          priceinfo="10,000원"
          buttontype="cancel"
        />
      </div>
      <div className="grid gap-2">
        <div className="font-semibold ">완료한 세차</div>
        <ReservationItem
          imgsrc="https://i.namu.wiki/i/yxy4APuvvDp8JyH0Xvd_tWsL--BXEolkQT_PFSbi3H8YOA_1nn2dXm_DzYdP9x8ODt6BNp00ayCGOHT4VR-o2eyUO50iizlQXYG_g61MIIi3Nl3SDZw1EXnjg3eDZmxhxghsPo9BmVw205aYNk_EZg.webp"
          reservetime="23/10/31 17:00~18:00"
          bayname="용봉셀프세차 : 베이1"
          priceinfo="10,000원"
          buttontype="review"
        />
      </div>
    </div>
  );
};

export default ReservationHistoryTemplate;
