"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiShoppingBasket } from "react-icons/ci";
import { MdSell } from "react-icons/md";
import { AiOutlineStock } from "react-icons/ai";
import { GrBusinessService } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSettings } from "react-icons/ci";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sideList = [
    {
      icon: <CiShoppingBasket className="text-2xl" />,
      title: "Vente",
      linkref: '/dashboard/vente'
    },
    {
      icon: <AiOutlineStock className="text-2xl" />,
      title: "Stock",
      linkref: '/dashboard/stock'
    },
    {
      icon: <MdSell className="text-2xl" />,
      title: "Commande",
      linkref: 'dashboard/commande'
    },
    {
      icon: <GrBusinessService className="text-2xl" />,
      title: "Service",
      linkref: 'dashboard/service'
    },
  ];


  const handleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleEscKeyPress = (e) => {
      if (e.keyCode === 27 && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.setProperty("overflow", "hidden");
    } else {
      document.body.style.removeProperty("overflow");
    }

    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [isOpen]);

  return (
    <nav className="flex  w-full items-center justify-between px-6 h-16 bg-white text-gray-700 border-b border-gray-200 z-10">
      <div className="flex items-center">
        <button className="mr-2" aria-label="Open Menu" onClick={handleDrawer}>
          <GiHamburgerMenu className="text-3xl" />
        </button>

        <img
          src="./android-chrome-512x512.png"
          alt="Logo"
          className="h-auto w-14 h-14"
        />
        <div className="text-green-600">
          <h1>SAHEL <span className="text-blue-900">PHARMA</span></h1>
        </div>
      </div>

      <div className="flex items-center">
        <div className="hidden md:flex md:justify-between md:bg-transparent">
        </div>
      </div>

      {isOpen && (
        <div className="z-10 fixed inset-0 transition-opacity">
          <div
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black opacity-50"
            tabIndex="0"
          ></div>
        </div>
      )}

      <aside
        className={`transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <span className="flex w-full items-center p-4 border-b">
          <img
            src="./android-chrome-512x512.png"
            alt="Logo"
            className="h-auto w-14 h-14"
          />
          <div className="text-green-600">
            <h1>SAHEL <span className="text-blue-900">PHARMA</span></h1>
          </div>
        </span>
        {sideList.map(({ icon, title, linkref }, index) => {
          return (
            <Link href={linkref}>
              <span
                key={index}
                className="flex items-center p-4 hover:bg-green-500 hover:text-white "
              >
                <span className="mr-2">{icon}</span> <span>{title}</span>
              </span>
            </Link>
          );
        })}
        <div className="fixed bottom-0 w-full">
          <button className="flex items-center p-4 text-white bg-blue-500 hover:bg-blue-600 w-full">
            <span className="mr-2">
              <CiSettings className="text-2xl" />
            </span>

            <span>Configuration</span>
          </button>
        </div>
      </aside>
    </nav>
  );
};

export default Navbar;