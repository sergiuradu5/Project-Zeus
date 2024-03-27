import { useEffect, useState } from "react";
import { BE_deleteUser, BE_updateUser } from "../backend/user-queries";
import DeleteProfileModal from "../components/Profile/DeleteProfileModal";
import Button from "../components/UI/Button";
import ImageComponent from "../components/UI/Image";
import Input from "../components/UI/Input";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { generateAvatarImgLink } from "../utils/generate-avatar";
import { toastErr, toastWarning } from "../utils/toast";

type ProfilePageProps = {};
const ProfilePage = (props: ProfilePageProps) => {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  function handleGenerateAvatar() {
    const newAvatarLink = generateAvatarImgLink();
    setAvatar(newAvatarLink);
    setAvatarLoading(true);
  }

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value.trim());
  }

  function handleOnAvatarError() {
    setAvatar(currentUser.img);
  }

  function handleOnAvatarLoaded() {
    setAvatarLoading(false);
  }

  function handleSaveProfile() {
    if (!email || !username) toastErr("Email or username can't be empty");

    let tempPassword = password;
    if (tempPassword && tempPassword !== confirmPassword) {
      toastErr("Passwords must match");
      tempPassword = "";
      return;
    }

    let tempEmail = email;
    if (tempEmail === currentUser.email) tempEmail = "";

    let tempUsername = username;
    if (tempUsername === currentUser.username) tempUsername = "";

    let tempAvatar = avatar;
    if (tempAvatar === currentUser.img) tempAvatar = "";

    if (tempEmail || tempUsername || tempPassword || tempAvatar) {
      BE_updateUser(
        {
          username: tempUsername,
          email: tempEmail,
          img: tempAvatar,
          password: tempPassword,
        },
        dispatch,
        setUpdateLoading
      );
    } else {
      toastWarning("Change details before saving");
    }
  }

  function handleOpenDeleteModal() {
    setShowModal(true);
  }

  function handleCloseDeleteModal() {
    setShowModal(false);
  }

  function handleDeleteProfile() {
    BE_deleteUser(dispatch, setDeleteLoading);
  }

  useEffect(() => {
    setEmail(currentUser.email);
    setUsername(currentUser.username);
    setAvatar(currentUser.img);
  }, [currentUser]);

  return (
    <div
      className="bg-white flex flex-col gap-5 
    shadow-md max-w-2xl rounded-xl py-5 px-6 md:py-10 md:px-14 md:m-auto m-5 md:mt-10"
    >
      {showModal && (
        <DeleteProfileModal
          loading={deleteLoading}
          onConfirm={handleDeleteProfile}
          onClose={handleCloseDeleteModal}
        />
      )}
      <div className="relative self-center">
        <ImageComponent
          src={avatar}
          alt="User profile"
          onClick={handleGenerateAvatar}
          onLoadError={handleOnAvatarError}
          onLoadSuccess={handleOnAvatarLoaded}
          className="w-32 h-32 md:w-40 md:h-40 md:left-40 rounded-full m-[2px] ring-2 ring-gray-300 cursor-pointer hover:shadow-lg"
        />
        <span className="absolute top-2 right-0 md:right-4 md:top-3 w-6 h-6 border-2 border-gray-800 rounded-full bg-green-400"></span>
      </div>
      <p className="text-gray-400 text-sm text-center">
        Note: Click on image to temporary change it, when you like it, then save
        profile. You can leave password and username as they are if you don't
        want to change them.
      </p>
      <div className="flex flex-col gap-3">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
        />
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value.trim())}
        />
        <Input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
        />
        <Input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value.trim())}
        />
        <Button
          disabled={avatarLoading}
          loading={updateLoading}
          onClick={handleSaveProfile}
          className={avatarLoading ? "cursor-not-allowed" : ""}
        >
          Update Profile
        </Button>
        <Button secondary onClick={handleOpenDeleteModal}>
          Delete Profile
        </Button>
      </div>
    </div>
  );
};
export default ProfilePage;
