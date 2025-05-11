import { User } from "@/types/user";
import { SetStateAction } from "react";
import UpdateUserForm from "./updateUser/updateUserForm";
import UpdateUserPasswordForm from "./updateUser/updateUserPasswordForm";
import UpdateUserProfilPicture from "./updateUser/updateUserProfilPicture";

interface UpdateUserModalProps {
  userInfos: User;
  closeModal: (value: SetStateAction<boolean>) => void;
}

export default function UpdateUserModal({
  closeModal,
  userInfos,
}: UpdateUserModalProps) {
  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-90 flex justify-center items-center z-50">
      <div
        className="bg-gray-300 flex flex-col rounded-md shadow-inner p-6 border-2"
        style={{
          borderColor: "#808080",
          boxShadow: "inset -2px -2px 0 #fff, inset 2px 2px 0 #000",
        }}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-900">
          Modifier votre profil
        </h2>
        <div className="flex gap-5 items-start">
          <UpdateUserProfilPicture />
          <UpdateUserForm user={userInfos} />
          <UpdateUserPasswordForm />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => closeModal(false)}
            className="px-4 py-2 text-white font-bold text-center"
            style={{
              backgroundColor: "#0078d7",
              border: "2px solid #000",
              boxShadow: "inset -2px -2px 0 #fff, inset 2px 2px 0 #000",
              textShadow: "1px 1px 2px #000",
            }}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
