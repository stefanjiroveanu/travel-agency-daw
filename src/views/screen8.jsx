import Navbar from "../components/screen4/navbar";
import { ReactComponent as Email } from "../externals/iconemail.svg";
import { ReactComponent as Phone } from "../externals/phone.svg";
import { ReactComponent as Pin } from "../externals/iconpin.svg";
import Footer from "../components/screen8/footer";
import { useGeolocation } from "../context/geolocator";

const Screen8 = () => {
  const { latitude, longitude, city, country, error } = useGeolocation();
  return (
    <div className="screen4-frame14">
      <div className="screen4-frame40">
        <div className="screen4-frame39">
          <Navbar textColor="white" />
          <div className="screen4-hero-content">
            <span className="screen4-text11">
              <span>Get in contact with us</span>
            </span>
            <span className="screen4-text13">
              <span>
                We help people find co travellers and also structure their
                travel plans
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="screen4-features justify-center">
        <div className=" gap-5 w-[398px] flex grow-0 flex-col items-center justify-center shrink-0">
          <Email className="screen4-shield-checksvg" />
          <span className="screen4-text-feature-bold">
            <span>Email</span>
          </span>
          <span
            className="
          text-[rgba(16,46,56,1)]
          w-[332px]
          h-auto
          text-lg
          text-center
          leading-normal
          items-stretch"
          >
            <span>contact@mamuttravel.com</span>
          </span>
        </div>
        <div className="gap-5 w-[398px] flex grow-0 flex-col items-center justify-center shrink-0">
          <Phone className="screen4-airplanesvg" />
          <span className="screen4-text-feature-bold">
            <span>Phone</span>
          </span>
          <span className=" text-[rgba(16,46,56,1)]
          w-[332px]
          h-auto
          text-lg
          text-center
          leading-normal
          items-stretch">
            <span>+40712345678</span>
          </span>
        </div>
        <div className="gap-5 w-[398px] flex grow-0 flex-col items-center justify-center shrink-0">
          <Pin className="screen4-faderssvg" />
          <span className="screen4-text-feature-bold">
            <span>Office</span>
          </span>
          <span className="text-[rgba(16,46,56,1)]
          w-[332px]
          h-auto
          text-lg
          text-center
          leading-normal
          items-stretch">
            <a href="https://www.google.com/maps/dir//Strada+Ceahl%C4%83u+77,+Cluj-Napoca+400347/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x47490dd3a075e575:0x7c606b3cbc9c176f?sa=X&ved=2ahUKEwil88yyjuKEAxV19gIHHf_6CVcQwwV6BAgWEAA">
              Ceahlau 77, Cluj-Napoca, Romania
            </a>
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Screen8;
