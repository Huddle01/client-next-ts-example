import { useDataMessage, useLocalPeer } from '@huddle01/react/hooks';
import { useState } from 'react';
import LocalMessageBubble from './LocalMessageBubble';
import RemoteMessageBubble from './RemoteMessageBubble';

export type TMessage = {
  text: string;
  sender: string;
};

function ChatBox() {
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [text, setText] = useState<string>('');

  const { peerId } = useLocalPeer();
  const { sendData } = useDataMessage({
    onMessage: (payload, from, label) => {
      if (label === 'chat') {
        setMessages((prev) => [...prev, { text: payload, sender: from }]);
      }
    },
  });

  const sendMessage = () => {
    sendData({
      to: '*',
      payload: text,
      label: 'chat',
    });
    setText('');
  };

  return (
    <div className="w-1/3 border-2 border-blue-400 rounded-lg flex flex-col">
      <h1 className="text-center text-2xl my-2 border-b border-blue-400">
        Chat Room
      </h1>
      <div className="flex-1 p-4 border-b border-blue-400">
        {messages.map((message, index) =>
          message.sender === peerId ? (
            <LocalMessageBubble key={index} message={message} />
          ) : (
            <RemoteMessageBubble key={index} message={message} />
          )
        )}
      </div>
      <div className="flex p-1">
        <input
          type="text"
          className="self-end w-full bg-black text-white outline-none p-2 text-sm"
          placeholder="Type Message..."
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <button
          onClick={() => {
            sendMessage();
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="-2.4 -2.4 28.80 28.80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#000000"
            stroke-width="0.00024000000000000003"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.265 4.42619C1.04293 2.87167 2.6169 1.67931 4.05323 2.31397L21.8341 10.1706C23.423 10.8727 23.423 13.1273 21.8341 13.8294L4.05323 21.686C2.6169 22.3207 1.04293 21.1283 1.265 19.5738L1.99102 14.4917C2.06002 14.0087 2.41458 13.6156 2.88791 13.4972L8.87688 12L2.88791 10.5028C2.41458 10.3844 2.06002 9.99129 1.99102 9.50829L1.265 4.42619ZM21.0257 12L3.2449 4.14335L3.89484 8.69294L12.8545 10.9328C13.9654 11.2106 13.9654 12.7894 12.8545 13.0672L3.89484 15.3071L3.2449 19.8566L21.0257 12Z"
                fill="#ffffff"
              ></path>
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
