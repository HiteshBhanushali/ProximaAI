"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
const Header = ({ logo }) => {
  const [isUserButtonLoaded, setUserButtonLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = ()=>{
    setIsOpen(!isOpen)
  }

  const SkeletonLoader = () => (
    <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setUserButtonLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, []);
  return (
    <div className="bg-secondary/95 backdrop-blur-sm shadow-lg transition-all duration-300">
      <div className="w-[80%] m-auto flex gap-4 items-center justify-between py-2">
        <Link className="hidden md:block transform hover:scale-105 transition-transform duration-200" href="/dashboard">
          <Image src={logo} width={80} height={80} alt="logo" className="drop-shadow-md" />
        </Link>
        <ul className="hidden md:flex gap-6">
          <Link href="/dashboard">
            <li className={`relative px-3 py-2 hover:text-primary transition-colors duration-200 cursor-pointer before:content-[""] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-primary before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300 ${path == "/dashboard" ? "text-primary font-semibold before:scale-x-100" : ""}`}>
              Dashboard
            </li>
          </Link>
          <Link href="/dashboard/question">
            <li className={`relative px-3 py-2 hover:text-primary transition-colors duration-200 cursor-pointer before:content-[""] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-primary before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300 ${path == "/dashboard/question" ? "text-primary font-semibold before:scale-x-100" : ""}`}>
              Questions
            </li>
          </Link>
          <Link href="/dashboard/aptitude">
            <li className={`relative px-3 py-2 hover:text-primary transition-colors duration-200 cursor-pointer before:content-[""] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-primary before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300 ${path == "/dashboard/aptitude" ? "text-primary font-semibold before:scale-x-100" : ""}`}>
              Aptitude Test
            </li>
          </Link>
          <Link href="/dashboard/projects">
            <li className={`relative px-3 py-2 hover:text-primary transition-colors duration-200 cursor-pointer before:content-[""] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-primary before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300 ${path == "/dashboard/projects" ? "text-primary font-semibold before:scale-x-100" : ""}`}>
              Projects
            </li>
          </Link>
          <Link href="/dashboard/howit">
            <li className={`relative px-3 py-2 hover:text-primary transition-colors duration-200 cursor-pointer before:content-[""] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-primary before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300 ${path == "/dashboard/howit" ? "text-primary font-semibold before:scale-x-100" : ""}`}>
              How it works?
            </li>
          </Link>
        </ul>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
        <div className="flex gap-10" >
          <ModeToggle  />
          {isUserButtonLoaded ? <UserButton /> : <SkeletonLoader />}
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-5">
            <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3" >
              <Link href="/dashboard">
                <li className={`relative px-3 py-2 hover:text-primary transition-colors duration-200 cursor-pointer before:content-[""] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-primary before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300 ${path == "/dashboard" ? "text-primary font-semibold before:scale-x-100" : ""}`}>
                  Dashboard
                </li>
              </Link>
              <Link href="/dashboard/question">
                <li className={`relative px-3 py-2 hover:text-primary transition-colors duration-200 cursor-pointer before:content-[""] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-primary before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300 ${path == "/dashboard/question" ? "text-primary font-semibold before:scale-x-100" : ""}`}>
                  Questions
                </li>
              </Link>
              <Link href="/dashboard/aptitude">
                <li className={`relative px-3 py-2 hover:text-primary transition-colors duration-200 cursor-pointer before:content-[""] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-primary before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300 ${path == "/dashboard/aptitude" ? "text-primary font-semibold before:scale-x-100" : ""}`}>
                  Aptitude Test
                </li>
              </Link>
              <Link href="/dashboard/howit">
                <li className={`relative px-3 py-2 hover:text-primary transition-colors duration-200 cursor-pointer before:content-[""] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-primary before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300 ${path == "/dashboard/howit" ? "text-primary font-semibold before:scale-x-100" : ""}`}>
                  How it works?
                </li>
              </Link>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
