import { SetStateAction } from "react";

interface DeleteUserProps {
  action: () => Promise<void>;
  closeModal: (value: SetStateAction<boolean>) => void;
}

export default function DeleteUser({ action, closeModal }: DeleteUserProps) {
  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-90 flex justify-center items-center z-50">
      <div
        className="bg-gray-300 p-6 rounded-md shadow-inner border-2"
        style={{
          borderColor: "#808080",
          boxShadow: "inset -2px -2px 0 #fff, inset 2px 2px 0 #000",
        }}
      >
        <h2 className="text-lg font-bold mb-4 text-gray-900">
          Confirmer la suppression
        </h2>
        <p className="mb-4 text-gray-700">
          Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est
          irréversible.
        </p>
        <div className="flex justify-end gap-2">
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
          <button
            onClick={action}
            className="px-4 py-2 text-white font-bold text-center"
            style={{
              backgroundColor: "#ff5c5c",
              border: "2px solid #000",
              boxShadow: "inset -2px -2px 0 #fff, inset 2px 2px 0 #000",
              textShadow: "1px 1px 2px #000",
            }}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
