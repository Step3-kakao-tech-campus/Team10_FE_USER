const reservations = {
  success: true,
  response: [
    {
      reservation: {
        time: {
          start: "13:00",
          end: "15:00",
        },
        price: 0,
        bayNo: 1,
      },
      carwash: {
        name: "세차장",
        location: {
          latitude: 10.0,
          longitude: 20.0,
        },
      },
    },
  ],
  error: null,
};

export default reservations;
