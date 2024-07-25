import {
  agents,
  agents2,
  configurations,
  configurations2,
  customers,
  customers2,
  dashboard,
  dashboard2,
  Logo,
  menu,
  payment,
  services,
  services2,
  transactions,
  transactions2,
  user,
} from "@/constants/assets";
import { useCallback, useEffect, useRef, useState } from "react";
import "../../App.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateNavbarText } from "@/store/slices/navbarText-slice";
import { RootState } from "@/store/root-reducer";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const modalIcons = Array.from(document.querySelectorAll(`.more`));

      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !modalIcons.some((icon) => icon.contains(event.target as Node))
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const mainLinks = [
    {
      text: "Agents",
      icon: agents,
      activeIcon: agents2,
      urls: ["/agents"],
    },
    {
      text: "Configurations",
      icon: configurations,
      activeIcon: configurations2,
      urls: ["/configurations"],
    },
    {
      text: "Customers",
      icon: customers,
      activeIcon: customers2,
      urls: ["/customers"],
    },
    {
      text: "Dashboard",
      icon: dashboard,
      activeIcon: dashboard2,
      urls: ["/dashboard"],
    },
    {
      text: "Services",
      icon: services,
      activeIcon: services2,
      urls: ["/services"],
    },
    {
      text: "Transactions",
      icon: transactions,
      activeIcon: transactions2,
      urls: ["/transactions"],
    },
  ];

  const navbarText = useSelector((state: RootState) => state.navbar.navbarText);

  const location = useLocation();
  const dispatch = useDispatch();

  // Effect to update navbar text based on location
  useEffect(() => {
    const path = location.pathname;
    const navText: { [key: string]: string } = {
      "/dashboard": "Dashboard",
      "/agents": "Agents",
      "/customers": "Customers",
      "/configurations": "Configurations",
      "/services": "Services",
      "/transactions": "Transactions",
    };

    // Check if the URL path includes a specific segment
    const matchingPath =
      Object.keys(navText).find((key) => path.includes(key)) || "";

    // Dispatch action to update navbar text
    dispatch(updateNavbarText(navText[matchingPath] || navbarText));
  }, [dispatch, location.pathname, navbarText]);

  const handleLinkClick = useCallback(
    (text: string) => {
      dispatch(updateNavbarText(text));
    },
    [dispatch]
  );

  const [isHovered, setIsHovered] = useState<string | null>(null);

  const isActive = useCallback(
    (...to: string[]) => {
      return to.some((url) => location.pathname.startsWith(url));
    },
    [location.pathname]
  );

  return (
    <div className="fixed z-50 w-full">
      <div className="h-[11vh] bg-white border-b flex justify-between items-center px-5">
        <div className="flex items-center">
          <img src={Logo} alt="" />
          <span className="font-Urbanist font-semibold text-h8 text-primary-dark ml-3">
            Ticketing System
          </span>
        </div>
        <div className="flex items-center">
          <button
            type="submit"
            className="flex items-center justify-center hover:bg-primary-dark bg-primary text-white py-2 px-3 rounded-md  cursor-pointer"
          >
            <img src={payment} alt="" className="scale-110" />
            <span className="ml-3 font-medium font-Urbanist">
              Pay For a Service
            </span>
          </button>
          <div
            className="p-3 rounded-full bg-[#CDE7D5] hover:bg-[#c9d4cd] mx-5 cursor-pointer more"
            onClick={handleShowDropdown}
          >
            <img src={menu} alt="menu" className="" />
          </div>
          <div className="p-3 rounded-full bg-[#FCB90E] cursor-pointer">
            <img src={user} alt="profile" />
          </div>
          {showDropdown && (
            <div
              ref={modalRef}
              className="font-Inter bg-white p-2 absolute top-[5.5rem] right-24 grid grid-cols-3 gap-5 rounded-lg shadow-lg z-30 animate-fadeDownFast"
            >
              {mainLinks.map((page, index) => {
                return (
                  <div key={index}>
                    <Link
                      to={page.urls[0]}
                      onClick={() => handleLinkClick(page.text)}
                    >
                      <div
                        className="flex flex-col items-center cursor-pointer"
                        onMouseEnter={() => setIsHovered(page.urls[0])}
                        onMouseLeave={() => setIsHovered(null)}
                      >
                        <img
                          src={
                            isActive(...page.urls) || isHovered === page.urls[0]
                              ? page.activeIcon
                              : page.icon
                          }
                          alt=""
                        />
                        <span
                          className={`text-center ${
                            isActive(...page.urls) || isHovered === page.urls[0]
                              ? "text-primary"
                              : "text-main-3"
                          } text-h12 font-Urbanist mt-2`}
                        >
                          {page.text}
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="bg-white h-[7vh] px-5 flex items-center justify-start border-b">
        <span className="font-Urbanist font-semibold text-h9">{navbarText}</span>
      </div>
    </div>
  );
};

export default Navbar;
