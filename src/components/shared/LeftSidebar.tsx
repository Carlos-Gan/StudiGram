import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [[isSuccess]]);

  return (
    <nav className="leftsidebar fixed left-0 top-0">
      <div className="flex flex-col gap-8">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="assets\images\logo.svg"
            alt="logo"
            width={170}
            height={136}
          />
        </Link>
        <Link
          to={"/profile/%[user.id]"}
          className="flex-auto gap-5 items-center"
        >
          <img
            src={user.imageUrl|| "/assets/images/default-profile.png"}
            alt="profile"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="font-bold">{user.name}</p>
            <p className="font-normal text-gray-500">@{user.username}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={
                  "leftsidebar-link group ${isActive && 'bg-blue-500'}"
                }
              >
                <NavLink
                  to={link.route}
                  className="flex gap-2 items-center p-3"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className="group-hover:invert-white ${isActive && 'invert-white'}"
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shad-button_ghost py-10"
        onClick={() => signOut()}
      >
        <img src="public\assets\icons\logout.svg" alt="logo" />
        <p className="small-medium lg:base-medium py-5">
            Cerrar sesión
        </p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;