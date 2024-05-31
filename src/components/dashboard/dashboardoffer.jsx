import { useEffect, useState } from "react";
import { FiMinus, FiSave, FiCalendar } from "react-icons/fi";
import Taj from "../../externals/taj.jpg";
import axios from "axios";
import CalendarWithReservations from "./calendar";

export const DashboardOffer = (props) => {
  const [opacity, setOpacity] = useState();
  const [showCalendar, setShowCalendar] = useState(false);
  const toggleCalendar = () => setShowCalendar(!showCalendar);

  const changeOpacity = () => {

  };

  const handleDelete = async () => {
    const deletePlace = async () => {
      await axios.delete(`http://localhost:5000/places/${uuid}`);
    };

    await deletePlace();
    window.location.reload(false);
  };

  const {
    uuid,
    title: initialTitle,
    description: initialDescription,
    location: initialLocation,
    country: initialCountry,
    pricePerNight: initialPricePerNight,
    numberOfGuests: initialNumberOfGuests,
    numberOfRoomsFree: initialNumberOfRoomsFree,
    tripDeal: initialTripDeal,
  } = props;

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [locationCountry, setLocationCountry] = useState(
    `${initialLocation}, ${initialCountry}`
  );
  const [pricePerNight, setPricePerNight] = useState(initialPricePerNight);
  const [numberOfGuests, setNumberOfGuests] = useState(initialNumberOfGuests);
  const [numberOfRoomsFree, setNumberOfRoomsFree] = useState(
    initialNumberOfRoomsFree
  );
  const [tripDeal, setTripDeal] = useState(initialTripDeal);
  const [discount, setDiscount] = useState(0);

  const handleUpdate = async () => {
    const parts = locationCountry.split(",");
    const location = parts[0].trim();
    const country = parts.length > 1 ? parts[1].trim() : "";

    let finalTripDealPrice = pricePerNight;
    if (discount !== 0) {
      const discountAmount = (pricePerNight * discount) / 100;
      finalTripDealPrice = pricePerNight - discountAmount;
      setTripDeal(finalTripDealPrice);
    } else {
      setTripDeal(0);
    }

    try {
      const updateData = {
        title,
        description,
        location,
        country,
        pricePerNight,
        numberOfGuests,
        numberOfRoomsFree,
        tripDeal: finalTripDealPrice,
      };

      await axios.put(`http://localhost:5000/places/${uuid}`, updateData);
      alert("Update successful!");
    } catch (error) {
      console.error("Failed to update place:", error);
      alert("Update failed!");
    }
  };

  return (
    <div
      className="bg-[rgba(217,237,130,0.1)] flex items-center gap-20 py-8 px-24 flex-shrink-0 self-stretch"
      onClick={changeOpacity}
      style={{
        background: `rgb(217, 237,130, ${opacity})`,
      }}
    >
      <div className="flex items-start relative gap-[2.5em] ">
        <div className="bg-gradient-to-b from-transparent to-[#102E38] w-[327px] h-[452px] flex items-start relative rounded-lg">
          <img
            src={Taj}
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
                {locationCountry}
              </span>
            </div>
            <span className="text-white font-[Inter] text-[14px] font-normal">
              {`${Math.floor(Math.random() * 1000)} want to travel here`}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-16">
        <button>
          <FiMinus
            className="text-white bg-red-600 rounded-md w-8 h-8 relative left-[90em]"
            onClick={handleDelete}
          />
        </button>
        {tripDeal ? (
          <div className="absolute right-80 bg-[rgba(206,17,38,1)] flex items-end gap-[10px] p-[17px_54px] rounded-[20px]">
            <span className="text-white font-[Inter] text-[25px] font-semibold">
              Trip Deal
            </span>
          </div>
        ) : null}
        <div className="flex flex-row relative">
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-[#141B34] font-[Inter] text-[37px] font-bold bg-inherit resize-none"
          >
            {title}
          </textarea>
          <button onClick={toggleCalendar} className="relative top-[-30px]">
            <FiCalendar className="w-10 h-10"/>
          </button>
          {showCalendar && (
            <div
              style={{
                position: "absolute",
                top: "4rem",
                left: "60rem",
                width: "800px",
                transform: "translateX(-50%)",
                zIndex: 10,
                background: "white",
              }}
            >
              <CalendarWithReservations uuid={uuid}/>
            </div>
          )}
        </div>
        <div className="flex flex-col items-start gap-12">
          <div className="flex items-start gap-20">
            <span className="text-[#141B34] font-[Inter] text-[18px] font-semibold">
              Description:
            </span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-[#141B34] w-[748px] font-[Inter] text-[18px] font-semibold bg-inherit resize-none"
            >
              {description}
            </textarea>
          </div>
          <div className="flex items-start gap-[105px]">
            <span className="text-[#141B34] font-[Inter] text-[18px] font-semibold">
              Location:
            </span>
            <textarea
              value={locationCountry}
              onChange={(e) => setLocationCountry(e.target.value)}
              className="text-[#141B34] w-[748px] font-[Inter] text-[18px] font-semibold bg-inherit resize-none"
            >
              {locationCountry}
            </textarea>
          </div>
          <div className="flex items-start gap-20">
            <span className="text-[#141B34] font-[Inter] text-[18px] font-semibold">
              Price/Night:
            </span>
            {tripDeal ? (
              <div className="flex flex-row gap-[1em]">
                <span className="text-[rgba(206,17,38,1)] relative left-3 font-[Inter] text-[18px] font-semibold line-through">
                  $
                </span>
                <textarea
                  className="text-[rgba(206,17,38,1)] w-12 font-[Inter] text-[18px] font-semibold line-through bg-inherit resize-none"
                  value={pricePerNight}
                  onChange={(e) => setPricePerNight(e.target.value)}
                >
                  {pricePerNight}
                </textarea>
                <span className="text-[rgba(206,17,38,1)] w-[290px] relative right-4 font-[Inter] text-[18px] font-semibold line-through">
                  per Night
                </span>
                <span className="text-[rgba(206,17,38,1)] w-[290px] font-[Inter] text-[18px] font-extrabold underline">
                  ${tripDeal} per Night
                </span>
                <input
                  placeholder="Discount %"
                  className="bg-inherit"
                  value={discount}
                  onChange={(e) => {
                    setDiscount(e.target.value);
                  }}
                ></input>
              </div>
            ) : (
              <span className="text-[#141B34] w-[748px] font-[Inter] text-[18px] font-semibold bg-inherit resize-none">
                {pricePerNight}
              </span>
            )}
          </div>
          <div className="flex items-start gap-5">
            <span className="text-[#141B34] font-[Inter] text-[18px] font-semibold">
              Number of Guests:
            </span>
            <textarea
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
              className="text-[#141B34] w-[748px] font-[Inter] text-[18px] font-semibold bg-inherit resize-none"
            >
              {numberOfGuests}
            </textarea>
          </div>
          <div className="flex items-start gap-5">
            <span className="text-[#141B34] font-[Inter] text-[18px] font-semibold">
              Number of Rooms Free:
            </span>
            <textarea
              value={numberOfRoomsFree}
              onChange={(e) => setNumberOfRoomsFree(e.target.value)}
              className="text-[#141B34] w-[748px] font-[Inter] text-[18px] font-semibold bg-inherit resize-none"
            >
              {numberOfRoomsFree}
            </textarea>
            <button>
              <FiSave
                className="text-[#141B34] relative left-[27.7em] rounded-md w-10 h-10"
                onClick={handleUpdate}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOffer;
