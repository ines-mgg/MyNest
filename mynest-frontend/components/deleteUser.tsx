import { SetStateAction } from "react";
import { Button } from "./ui/button";

interface DeleteUserProps {
  action: () => Promise<void>;
  closeModal: (value: SetStateAction<boolean>) => void;
}

export default function DeleteUser({ action, closeModal }: DeleteUserProps) {
  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-color-primary">
          Confirmer la suppression
        </h2>
        <p className="mb-4 text-color-neutral-medium">
          Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est
          irréversible.
        </p>
        <div className="flex justify-end gap-2">
          <Button
            onClick={() => closeModal(false)}
            className="font-semibold bg-gray-300 hover:bg-gray-400"
          >
            Annuler
          </Button>
          <Button
            onClick={action}
            className="font-semibold bg-red-500 text-white hover:bg-red-600"
          >
            Supprimer
          </Button>
        </div>
      </div>
    </div>
  );
}
