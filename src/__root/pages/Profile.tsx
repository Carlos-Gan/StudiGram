import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";

import { useUserContext } from "@/context/AuthContext";
import { followUser, useGetUserById, useGetUserFollowers, useGetUserFollowing } from "@/lib/react-query/queries";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import GridPostList from "@/components/shared/GridPostList";
import LikedPosts from "./LikedPosts";
import { useMutation } from "@tanstack/react-query";

interface StatBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StatBlockProps) => (
  <div className="flex flex-col items-center">
    <p className="text-primary-500 font-semibold">{value}</p>
    <p className="text-light-2">{label}</p>
  </div>
);

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const { data: currentUser } = useGetUserById(id || "");

  const { data: followers, refetch:refetchFollowers} = useGetUserFollowers(id || "");
  const { data: following, refetch:refetchFollowing} = useGetUserFollowing(id || "");

  const followMutation = useMutation({
    mutationFn: (userId: string) => followUser(userId, user.id),
    onSuccess: () => {
      refetchFollowers();
      refetchFollowing();
    }
  });

  const unFollowMutation = useMutation({
    mutationFn: (userId: string) => followUser(userId, user.id),
    onSuccess: () => {
      refetchFollowers();
      refetchFollowing();
    }
  });

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader />
      </div>
    );
  }

  const isFollowing = followers?.some((f: any) => f.id === user.id);

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex flex-col xl:flex-row items-center xl:items-start gap-7">
          {/* Imagen de perfil */}
          <img
            src={currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="w-28 h-28 lg:w-36 lg:h-36 rounded-full"
          />

          {/* Información del usuario */}
          <div className="flex flex-col items-center xl:items-start text-center xl:text-left w-full">
            <h1 className="h3-bold md:h1-semibold">{currentUser.name}</h1>
            <p className="text-light-3">@{currentUser.username}</p>

            {/* Estadísticas */}
            <div className="flex gap-6 mt-5 justify-center xl:justify-start">
              <StatBlock value={currentUser.posts.length} label="Posts" />
              <StatBlock value={followers?.length} label="Followers" />
              <StatBlock value={following?.length} label="Following" />
            </div>

            {/* Biografía */}
            <p className="text-light-3 mt-4 max-w-screen-sm">{currentUser.bio}</p>
          </div>

          {/* Botones */}
          <div className="flex gap-4">
            {user.id === currentUser.$id ? (
              <Link
                to={`/update-profile/${currentUser.$id}`}
                className="h-12 bg-dark-4 px-5 text-light-1 flex items-center gap-2 rounded-lg"
              >
                <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                <span>Edit Profile</span>
              </Link>
            ) : (
              <Button type="button" className="shad-button_primary px-8">
                Follow
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      {currentUser.$id === user.id && (
        <div className="flex max-w-5xl w-full mt-5">
          <Link
            to={`/profile/${id}`}
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${id}` && "!bg-dark-3"
            }`}
          >
            <img src="/assets/icons/posts.svg" alt="posts" width={20} height={20} />
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`profile-tab rounded-r-lg ${
              pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
            }`}
          >
            <img src="/assets/icons/like.svg" alt="like" width={20} height={20} />
            Liked Posts
          </Link>
        </div>
      )}

      {/* Rutas */}
      <Routes>
        <Route index element={<GridPostList posts={currentUser.posts} showUser={false} />} />
        {currentUser.$id === user.id && <Route path="/liked-posts" element={<LikedPosts />} />}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
