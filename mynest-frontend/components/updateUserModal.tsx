import { User } from "@/types/user";
import { SetStateAction } from "react";
import UpdateUserForm from "./updateUser/updateUserForm";
import UpdateUserPasswordForm from "./updateUser/updateUserPasswordForm";
import { Button } from "./ui/button";
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
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white flex flex-col rounded shadow-lg p-6">
        <div className="flex gap-5 items-center">
          <UpdateUserProfilPicture />
          <UpdateUserForm user={userInfos} />
          <UpdateUserPasswordForm />
        </div>
        <Button
          onClick={() => closeModal(false)}
          className="font-semibold bg-gray-300 hover:bg-gray-400"
        >
          Annuler
        </Button>
      </div>
    </div>
  );
}
