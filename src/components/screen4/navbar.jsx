import { ReactComponent as Submenuarrow } from "../../externals/submenu-arrow.svg";
import { ReactComponent as Submenuarrowblack } from "../../externals/submenu-arrow-black.svg";
import { ReactComponent as MGlass } from "../../externals/magnifyingglass.svg";
import { ReactComponent as MGlassBlack } from "../../externals/magnifyingglassblack.svg";
import { ReactComponent as Account } from "../../externals/icons8-account-48.svg";
import { ReactComponent as AccountBlack } from "../../externals/icons8-account-48 copy.svg";
import Logo from "../../externals/image-removebg-preview.png";
import Submenuw from "./submenu";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import TripDeals from "./tripdeals";
import UserDropDown from "./userdropdown";
import { useAuth } from "../../context/authcontext";
import { logout } from "../../utils/firebaseConfig";

export const Navbar = ({ textColor, setSearchTerm }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [degrees, setDegrees] = useState(0);
  const location = useLocation();
  const isDestinationsPage = location.pathname === "/destinations";
  const isDashboardPage = location.pathname === "/dashboard";

  const { currentUser } = useAuth();

  const openMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const openUser = () => {
    setIsOpenUser(!isOpenUser);
  };

  const customStyle = {
    "--navbar-text-color": textColor,
  };

  return (
    <div className="screen4-header-nav">
      <img className="screen4-whole-logo" src={Logo} />
      <div className="screen4-links">
        <div className="screen4-frame30">
          {isDashboardPage || isDestinationsPage ? (
            textColor === "white" ? (
              <div className="border-white gap-[10px] flex px-[12px] py-[12px] items-center border-solid border-2 rounded-[38px] justify-center relative">
                <MGlass />
                <input
                 onChange={(e) => setSearchTerm(e.target.value)}
                  className=" 
              bg-transparent
              text-white
              h-auto
              text-lg
              font-sm
              text-left
              leading-normal
              focus:outline-none
              relative
              w-[45em]
              "
                  placeholder="Find your trip"
                ></input>
              </div>
            ) : (
              <div className="border-black gap-[10px] flex px-[12px] py-[12px] items-center border-solid border-2 rounded-[38px] justify-center relative">
                <MGlassBlack />
                <input
                onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent
                text-black
                h-auto
                text-lg
                font-sm
                text-left
                leading-normal
                focus:outline-none
                relative
                w-[45em]"
                  placeholder="Find your trip"
                ></input>
              </div>
            )
          ) : null}
          <Link to="/" className="screen4-text-nav" style={customStyle}>
            Home
          </Link>
          <Link to="/contact" className="screen4-text-nav" style={customStyle}>
            Contact
          </Link>
          <Link
            to="/destinations"
            className="screen4-text-nav"
            style={customStyle}
          >
            Destinations
          </Link>
          <button className="screen4-frame6button">
            <span
              className="screen4-text-nav screen4-destinations"
              style={customStyle}
              onClick={openMenu}
            >
              <span>Trip Deals</span>
            </span>
            <div className="screen4-submenuarrow">
              {textColor === "white" ? <Submenuarrow /> : <Submenuarrowblack />}
            </div>
          </button>
          {isOpenMenu ? (
            <Submenuw  position={isDestinationsPage || isDashboardPage ? "79em" : "22.5em"}>
              <TripDeals/>
            </Submenuw>
          ) : (
            false
          )}
          <button className="screen4-text-nav" onClick={openUser}>
            {textColor === "white" ? (
              <Account className="h-8" />
            ) : (
              <AccountBlack className="h-8" />
            )}
          </button>
          {isOpenUser ? (
            <UserDropDown position={isDestinationsPage || isDashboardPage ? "88em" : "32em"}>
              {currentUser ? (
                <div className="screen4-text-nav" style={customStyle}>{`${
                  currentUser.email.split("@")[0]
                }`}</div>
              ) : null}
              {!currentUser ? (
                <Link
                  to="/login"
                  className="screen4-text-nav"
                  style={customStyle}
                >
                  Login
                </Link>
              ) : (
                <button
                  className="screen4-text-nav"
                  style={customStyle}
                  onClick={logout}
                >
                  Logout
                </button>
              )}
            </UserDropDown>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
