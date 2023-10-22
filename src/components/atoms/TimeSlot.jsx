const TimeSlot = ({ startHour, endHour, isReservedCallback }) => {
  return (
    <div className="flex">
      {Array.from({ length: endHour - startHour }).map((_, index) => {
        const hour = startHour + index;
        const startReserved = isReservedCallback(hour);
        const halfReserved = isReservedCallback(hour, true);

        return (
          <div key={hour} className="flex flex-col items-center px-1">
            <div className="flex flex-col w-2 h-8">
              <div
                className={`flex-grow ${
                  startReserved ? "bg-primary" : "bg-gray-200"
                }`}
              />
              <div
                className={`flex-grow ${
                  halfReserved ? "bg-primary" : "bg-gray-200"
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
  );
};

export default TimeSlot;
