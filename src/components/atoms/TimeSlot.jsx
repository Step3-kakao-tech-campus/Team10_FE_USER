const TimeSlot = ({ startHour, endHour, isReservedCallback }) => {
  return (
    <div className="flex flex-col m-2">
      <div className="flex mb-4 flex-tems">
        <div className="flex items-center ml-8">
          <div className="w-3 h-3 mr-2 bg-primary" />
          예약 가능 시간
        </div>
        <div className="flex items-center ml-8">
          <div className="w-3 h-3 mr-2 bg-gray-300" />
          예약된 시간
        </div>
      </div>
      <div className="flex justify-center w-full overflow-x-auto">
        {Array.from({ length: endHour - startHour }, (_, index) => {
          const hour = startHour + index;
          const isStartReserved = isReservedCallback(hour);
          const isHalfReserved = isReservedCallback(hour, true);

          return (
            <div key={hour} className="flex flex-col items-center px-1">
              <div className="w-2 h-8 overflow-hidden rounded-sm">
                <div
                  className={`h-4 ${
                    isStartReserved ? "bg-gray-300" : "bg-primary"
                  }`}
                />
                <div
                  className={`h-4 ${
                    isHalfReserved ? "bg-gray-300" : "bg-primary"
                  }`}
                />
              </div>
              <div
                className={`text-xs mt-1 ${
                  hour === startHour ? "text-yellow-500" : "text-gray-500"
                }`}
              >
                {hour}시
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlot;
