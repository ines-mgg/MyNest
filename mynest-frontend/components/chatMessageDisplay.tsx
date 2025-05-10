import { Message } from "@/types/message";
import Image from "next/image";

export default function ChatMessageDisplay({ message }: { message: Message }) {
  return (
    <div
      className="mb-4 p-4 rounded-lg flex items-start"
      style={{
        backgroundColor: message.sender.customBubbleColor,
        border: "2px solid #87ceeb",
        boxShadow: "0 0 10px #87ceeb",
      }}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_BACK_URL}/uploads/profil-pictures/${message.sender.profilPicture}`}
        alt={`photo de profil - ${message.sender.username}`}
        width={40}
        height={40}
        className="rounded-full mr-4"
        style={{
          border: "2px solid #4682b4",
          boxShadow: "0 0 5px #4682b4",
        }}
      />
      <div>
        <div className="flex items-center">
          <span
            className="font-bold text-lg"
            style={{ textShadow: "1px 1px 2px #000" }}
          >
            {message.sender.username}
          </span>
        </div>
        <p
          className="mt-2"
          style={{
            marginLeft: "10px",
            textShadow: "1px 1px 2px #000",
          }}
        >
          {message.content}
        </p>
      </div>
    </div>
  );
}
