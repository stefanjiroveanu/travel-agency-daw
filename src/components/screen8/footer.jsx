import { ReactComponent as Instagram } from "../../externals/instagram.svg";
import { ReactComponent as Facebook } from "../../externals/facebook.svg";

const Footer = () => {
  return (
    <div className="flex flex-col items-start gap-[54px] px-[152px] self-stretch relative h-auto">
      <div className="flex items-center gap-[491px]">
        <div className="flex flex-row items-start pt-7">
          <span className="text-black font-inter font-medium text-[16px] leading-normal decoration-none">
            Mamut
          </span>
          <span className="text-black font-it text-[16px]">Travel.</span>
        </div>
      </div>
      <div className="bg-gray-300 w-full h-[1px] mt-8"></div>
      <div className="flex items-end gap-[50px] z-30 flex-row">
        <span className="text-black z-20 font-inter text-[12px] leading-normal decoration-none mr-[125em]">
          copyright@ mamuttravel 2023
        </span>
        <Instagram className="w-8" />
        <Facebook className="w-8" />
      </div>
    </div>
  );
};

export default Footer;
