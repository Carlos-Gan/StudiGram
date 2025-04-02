import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useMutation } from '@tanstack/react-query';
import { followUser, unfollowUser } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  const { user: currentUser } = useUserContext();

  // Mutaciones para seguir y dejar de segui
  const unfollowMutation = useMutation({
    mutationFn: (userId: string) => unfollowUser(userId, currentUser.id),
  });

  const followMutation = useMutation({
    mutationFn: (userId: string) => followUser(userId, currentUser.id),
  });

  const isFollowing = user.followers?.some((follower: any) => follower.id === currentUser.id);

  return (
    <Link to={`/profile/${user.$id}`} className="user-card">
      <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-full w-14 h-14"
      />

      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {user.name}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{user.username}
        </p>
      </div>

      <Button
        type="button"
        size="sm"
        className="shad-button_primary px-5"
        onClick={() => {
          if (isFollowing) {
            unfollowMutation.mutate(user.id);
          } else {
            followMutation.mutate(user.id);
          }
        }}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
    </Link>
  );
};

export default UserCard;
