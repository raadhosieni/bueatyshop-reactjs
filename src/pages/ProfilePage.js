import { useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);

  return <div>{user.id}</div>;
};

export default ProfilePage;
