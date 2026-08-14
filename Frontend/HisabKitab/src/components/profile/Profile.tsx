import useFetchUser from "@/hooks/useFetchUser";
import ProfileForm from "../../forms/ProfileForm";
import { useNavigate } from "@tanstack/react-router";
const Profile = () => {
  const { data, isLoading, isSuccess } = useFetchUser();
  const navigate = useNavigate();
  if (isLoading) {
    return <p>Loading Profile</p>;
  }
  if (!data) {
    return <p>User not found</p>;
  }
  if (isSuccess) {
    navigate({ to: "/profile" });
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <ProfileForm
          id={data?.id}
          picture={data?.picture}
          username={data?.username}
          email={data?.email}
          first_name={data?.first_name}
          last_name={data?.last_name}
        />
      </div>
    </div>
  );
};

export default Profile;
