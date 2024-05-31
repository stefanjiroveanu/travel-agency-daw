import { useState } from "react";
import { useImages } from "../../context/unslpashcontext";
import RoomDetails from "./room";
import { useAuth } from "../../context/authcontext";
import axios from "axios";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';


export const Offer = ({
  title,
  description,
  location,
  country,
  pricePerNight,
  numberOfGuests,
  numberOfRoomsFree,
  tripDeal,
  index,
  rooms,
  startDate,
  endDate,
}) => {
  const { images } = useImages();
  const [opacity, setOpacity] = useState(0.1);
  const { currentUser } = useAuth();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [currentRooms, setCurrentRooms] = useState(rooms);

  const changeOpacity = () => {
    setOpacity(opacity < 0.3 ? 0.1 : 0.1);
  };

  const imageUrl = 
    images.length > 0 ? images[index % images.length].urls.small : "";

  const toggleRoomSelection = (room) => {
    if (selectedRooms.includes(room)) {
      setSelectedRooms(
        selectedRooms.filter((currentRoom) => currentRoom !== room)
      );
    } else {
      setSelectedRooms([...selectedRooms, room]);
    }
  };

  const navigate = useNavigate();

  const makeReservation = async () => {
    let successfulReservations = [];

    try {
      const reservationPromises = selectedRooms.map((room) =>
        axios
          .post("http://localhost:5000/reservations", {
            userId: currentUser.uid,
            room: room,
            startDate: startDate,
            endDate: endDate,
          })
          .then((response) => {
            successfulReservations.push({ ...room, ...response.data });
            return { status: "fulfilled", room: room, data: response.data };
          })
          .catch((error) => {
            return { status: "rejected", roomUuid: room.uuid };
          })
      );

      const responses = await Promise.allSettled(reservationPromises);

      if (successfulReservations.length > 0) {
        navigate("/reservation-success", {
          state: { reservationDetails: successfulReservations.map((reservation) => reservation.reservation) },
        });
      } else {
        toast.error("No reservations were successful.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error("There was an error processing reservations.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.error("Failed to make reservation:", error);
    }
  };

  const isRoomAvailable = (reservations, startDate, endDate) => {
    const checkReservations = reservations.every((reservationDate) => {
      const occupiedFrom = new Date(reservationDate.occupiedFrom);
      const occupiedUntil = new Date(reservationDate.occupiedUntil);

      return endDate < occupiedFrom || startDate > occupiedUntil;
    });
    return checkReservations || reservations.length === 0;
  };

  return (
    <div
      className="bg-[rgba(217,237,130,0.1)] flex items-center gap-20 py-8 px-24 flex-shrink-0 self-stretch z-0"
      onClick={changeOpacity}
      style={{
        background: `rgb(217, 237,130, ${opacity})`,
      }}
    >
      <ToastContainer />
      <div className="flex items-start relative gap-[2.5em] ">
        <div className="bg-gradient-to-b from-transparent to-[#102E38] w-[327px] h-[452px] flex items-start relative rounded-lg">
          <img
            src={imageUrl}
            className="absolute top-0 left-0 w-[327px] h-[452px] rounded-lg"
          />
          <div className="absolute bottom-10 text-center flex flex-col items-center gap-4 z-10">
            <span className="text-white font-[PlayfairDisplay] text-[37px] font-medium">
              {title}
            </span>
            <div className="flex items-start gap-1.75">
              <div className="w-[22px] h-[22px] flex items-start flex-shrink-0 rounded-full relative overflow-hidden">
                {/* Icons/images within this container */}
              </div>
              <span className="text-white font-[Inter] text-[18px] font-medium">
                {`${location},${country}`}
              </span>
            </div>
            <span className="text-white font-[Inter] text-[14px] font-normal">
              {`${Math.floor(Math.random() * 1000)} want to travel here`}
            </span>
          </div>
        </div>
      </div>
      <div className="flex relative flex-col items-start gap-16 pb-20">
        {tripDeal ? (
          <div className="absolute right-[-280px] bg-[rgba(206,17,38,1)] flex items-end gap-[10px] p-[17px_54px] rounded-[20px]">
            <span className="text-white font-[Inter] text-[25px] font-semibold">
              Trip Deal
            </span>
          </div>
        ) : null}
        <span className="text-[#141B34] font-[Inter] text-[37px] font-bold">
          {title}
        </span>
        <div className="flex flex-col relative items-start gap-12">
          <div className="flex items-start gap-20">
            <span className="text-[#141B34] font-[Inter] text-[18px] font-semibold">
              Description:
            </span>
            <span className="text-[#141B34] w-[748px] font-[Inter] text-[18px] font-semibold z-0">
              {description}
            </span>
          </div>
          <div className="flex items-start gap-[105px]">
            <span className="text-[#141B34] font-[Inter] text-[18px] font-semibold">
              Location:
            </span>
            <span className="text-[#141B34] w-[748px] font-[Inter] text-[18px] font-semibold">
              {`${location},${country}`}
            </span>
          </div>
          <div className="flex items-start gap-20">
            <span className="text-[#141B34] font-[Inter] text-[18px] font-semibold">
              Price/Night:
            </span>
            {tripDeal ? (
              <div className="flex flex-row gap-[1em]">
                <span className="text-[rgba(206,17,38,1)] font-[Inter] text-[18px] font-semibold ">
                  Starting from
                </span>
                <span className="text-[rgba(206,17,38,1)] ml-[-10px] w-[254px] font-[Inter] text-[18px] font-semibold line-through">
                  ${pricePerNight} per Night
                </span>
                <span className="text-[rgba(206,17,38,1)] w-[290px] font-[Inter] text-[18px] font-extrabold underline">
                  ${tripDeal} per Night
                </span>
              </div>
            ) : (
              <span className="text-[#141B34] w-[748px] font-[Inter] text-[18px] font-semibold">
                {pricePerNight}
              </span>
            )}
          </div>
          <div className="flex items-start gap-5">
            <span className="text-[#141B34] font-[Inter] text-[18px] font-semibold">
              Number of Guests:
            </span>
            <span className="text-[#141B34] w-[748px] font-[Inter] text-[18px] font-semibold">
              {numberOfGuests}
            </span>
          </div>
          <div className="flex items-start gap-5">
            <span className="text-[#141B34] font-[Inter] text-[18px] font-semibold">
              Number of Rooms Free:
            </span>
            <span className="text-[#141B34] w-[748px] font-[Inter] text-[18px] font-semibold">
              {numberOfRoomsFree}
            </span>
          </div>

          {currentUser && startDate && endDate && rooms.some((room) => isRoomAvailable(room.reservationDates, startDate, endDate)) ? (
            <div className="flex flex-wrap gap-5">
              {rooms
                .filter((room) =>
                  isRoomAvailable(room.reservationDates, startDate, endDate)
                )
                .map((room) => (
                  <div
                    key={room.roomUuid}
                    onClick={() => toggleRoomSelection(room)}
                  >
                    <RoomDetails {...room} />
                  </div>
                ))}
            </div>
          ) : (
            <span className="bg-[#141B34] text-white p-[17px_54px] rounded-[20px] font-[Inter] text-[24px] font-semibold text-center items-center justify-center self-center">
              Rooms unavailable in the current date range
            </span>
          )}
          {currentUser && selectedRooms.length > 0 ? (
            <button
              onClick={makeReservation}
              className="absolute bottom-[-100px] flex items-center self-center text-center bg-[rgba(206,17,38,1)] gap-[10px] p-[17px_54px] rounded-[20px]"
            >
              <span className="text-white font-[Inter] text-[25px] font-semibold">
                Make a Reservation
              </span>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Offer;
