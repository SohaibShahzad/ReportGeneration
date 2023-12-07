import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { MainNavLinks } from "./navlinks";

export const MainNavWrapper = ({ children }) => {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div>
      {showMenu && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-70 z-10" />
      )}
      <nav className="font-worksans mx-4 lg:mx-20 border-b border-[#DDDDDD] py-4 lg:py-12">
        <div className="px-2 lg:px-4 flex justify-between items-center">
          <div>
            <Link href="/">DocNinja</Link>
          </div>
          <div className="flex gap-10 items-center">
            <ul className="hidden lg:flex gap-10">
              {MainNavLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.path}>{link.title}</Link>
                </li>
              ))}
            </ul>
            <span className="flex items-center gap-2">
              {session ? (
                <Link
                  href="/dashboard"
                  className="text-[14px] lg:text-[18px] bg-yellow-400 px-4 py-1 lg:px-12 lg:py-3 rounded-lg font-bold hover:scale-110 duration-200 hover:bg-yellow-500"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/register"
                  className="text-[12px] lg:text-[18px] bg-yellow-400 px-3 py-1 lg:px-12 lg:py-3 rounded-lg font-bold hover:scale-110 duration-200 hover:bg-yellow-500"
                >
                  Try for Free
                </Link>
              )}
              <div>
                <button
                  onClick={() => setShowMenu(prev => !prev)}
                  className="lg:hidden flex flex-col justify-between items-end w-[25px] h-[15px]"
                >
                  <span
                    className={`absolute h-[2px] z-10 bg-[#AAAAAA] rounded-lg transition-all duration-300 right-6 ${
                      showMenu
                        ? "transform rotate-45 w-[30px] top-7"
                        : "w-[25px] top-6"
                    }`}
                  ></span>
                  <span
                    className={`absolute h-[2px] z-10 bg-[#AAAAAA] rounded-lg transition-all duration-300 ${
                      showMenu
                        ? "transform -rotate-45 w-[30px] top-7"
                        : "w-[25px] top-8"
                    }`}
                  ></span>
                </button>
                <div ref={menuRef}>
                  {showMenu && (
                    <ul className="absolute bg-[#CCCCCC] rounded-md px-2 py-4 top-16 right-5 menu-animation">
                      {MainNavLinks.map((link, index) => (
                        <li key={index}>
                          <Link
                            href={link.path}
                            onClick={() => setShowMenu(false)}
                          >
                            {link.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </span>
          </div>
        </div>
      </nav>
      {/* {children} */}
    </div>
  );
};
