import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md flex items-center justify-between h-16 px-6 z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
          src="/assets/images/logo.svg"
          alt="logo"
          width={130}
          height={130}
          className="h-10"
        />
      </Link>

      {/* Botones de logout y perfil */}
      <div className="flex items-center gap-5">
        <Button variant="ghost" className="shad-button_ghost" onClick={() => signOut()}>
          <img src="/assets/icons/logout.svg" alt="logout" />
        </Button>

        <Link to={`/profile/${user.id}`} className="flex items-center gap-4">
          <img src={user.imageUrl || "/assets/images/default-profile.png"} alt="profile" className="h-10 w-10 rounded-full border" />
        </Link>
      </div>
    </nav>
  );
};

export default Topbar;

