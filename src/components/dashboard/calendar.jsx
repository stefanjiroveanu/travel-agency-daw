import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import axios from "axios";

const CalendarWithReservations = ({ uuid, index }) => {
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    const getReservations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/places/${uuid}/reservations`
        );
        const data = response.data;
        setReservations(
          data.map((reservation) => ({
            start: formatDateToYYYYMMDD(reservation.occupiedFrom),
            end: formatDateToYYYYMMDD(reservation.occupiedUntil),
            title: `${reservation.userId}`,
            extendedProps: {
              detail: {
                userId: reservation.userId,
                room: reservation.roomUuid,
                startDate: reservation.occupiedFrom,
                endDate: reservation.occupiedUntil,
                price: reservation.price,
                resevationTimestamp: reservation.reservationTimestamp,
              },
            },
          }))
        );
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    getReservations();
  }, [uuid]);

  function formatDateToYYYYMMDD(dateAsString) {
    const date = new Date(dateAsString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handleEventDidMount = (info) => {
    const detail = info.event.extendedProps.detail;
    const content = `
      <strong>User ID:</strong> ${detail.userId}<br>
      <strong>Room:</strong> ${uuid}<br>
      <strong>Start Date:</strong> ${formatDateToYYYYMMDD(detail.startDate)}<br>
      <strong>End Date:</strong> ${formatDateToYYYYMMDD(detail.endDate)}<br>
      <strong>Price:</strong> ${detail.price}<br>
      <strong>Reservation Timestamp:</strong> ${formatDateToYYYYMMDD(detail.resevationTimestamp)}
    `;

    tippy(info.el, {
      content: content,
      allowHTML: true,
    });
  };

  return (
    <div className="bg-inherit">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={reservations}
        eventDidMount={handleEventDidMount}
      />
    </div>
  );
};

export default CalendarWithReservations;
