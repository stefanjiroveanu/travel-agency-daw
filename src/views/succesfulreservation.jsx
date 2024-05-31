import React from "react";
import { useLocation } from "react-router-dom";

function SuccessfulReservationPage() {
  const location = useLocation();
  const { reservationDetails } = location.state || {};

  if (!reservationDetails) {
    return <div>No reservation details found.</div>;
  }


  return (
    <div className="self-center items-center justify-center text-center flex flex-col gap-10 text-[Inter]">
      <h1>Reservation Successful!</h1>
      {reservationDetails.map((reservation) => {
        return (
          <div>
            <h2>{reservation.name}</h2>
            <p>{reservation.description}</p>
            <p>Check-in: {reservation.startDate}</p>
            <p>Check-out: {reservation.endDate}</p>
            <p>Price: {reservation.price}</p>
            <p>Confirmation Number: {Math.floor(Math.random() * 100000)}</p>
          </div>
        );
      })}
    </div>
  );
}

export default SuccessfulReservationPage;
