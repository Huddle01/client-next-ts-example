import { useDataMessage, useLocalPeer } from "@huddle01/react/hooks";
import { useState } from "react";
import LocalMessageBubble from "./LocalMessageBubble";
import RemoteMessageBubble from "./RemoteMessageBubble";

export type TMessage = {
  text: string;
  sender: string;
};

function ChatBox() {
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [text, setText] = useState<string>("");

  const { peerId } = useLocalPeer();
  const { sendData } = useDataMessage({
    onMessage: (payload, from, label) => {
      if (label === "chat") {
        setMessages((prev) => [...prev, { text: payload, sender: from }]);
      }
    },
  });

  return (
    <div className="w-1/3 border-2 border-blue-400 rounded-lg flex flex-col">
      <h1 className="text-center my-2">Chat Room</h1>
      <div className="flex-1 p-4">
        {messages.map((message, index) =>
          message.sender === peerId ? (
            <LocalMessageBubble key={index} message={message} />
          ) : (
            <RemoteMessageBubble key={index} message={message} />
          )
        )}
      </div>
      <input
        type="text"
        className="self-end w-full bg-black text-white outline-none border-2 border-blue-400"
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            sendData({
              to: "*",
              payload: text,
              label: "chat",
            });

            setText("");
          }
        }}
      />
    </div>
  );
}

export default ChatBox;
