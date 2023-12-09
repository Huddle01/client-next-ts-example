import { TPeerMetadata } from "@/pages";
import { useRemotePeer } from "@huddle01/react/hooks";
import { TMessage } from "./ChatBox";

interface Props {
  message: TMessage;
}

function RemoteMessageBubble({ message }: Props) {
  const { metadata } = useRemotePeer<TPeerMetadata>({ peerId: message.sender });

  return (
    <div className="w-full items-start flex flex-col bg-blue-400 p-2">
      <span className="text-gray-500 text-xs">{metadata?.displayName}</span>
      <span className="text-white text-sm">{message.text}</span>
    </div>
  );
}

export default RemoteMessageBubble;
