const TimeSlot = ({ startHour, endHour, isReservedCallback }) => {
  return (
    <div className="flex flex-col m-2">
      <div className="flex justify-center w-full overflow-x-auto">
        {Array.from({ length: endHour - startHour }, (_, index) => {
          const hour = startHour + index;
          const isStartReserved = isReservedCallback(hour, false);
          const isHalfReserved = isReservedCallback(hour, true);

          console.log(index, hour, isStartReserved);
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
                {hour}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlot;
