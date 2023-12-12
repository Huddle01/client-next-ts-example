import { TPeerMetadata } from "@/pages";
import { useLocalPeer } from "@huddle01/react/hooks";
import { TMessage } from "./ChatBox";

interface Props {
  message: TMessage;
}

function LocalMessageBubble({ message }: Props) {
  const { metadata } = useLocalPeer<TPeerMetadata>();

  return (
    <div className="w-full items-end flex flex-col bg-white p-2 rounded-lg">
      {/* <span className="text-gray-500 text-xs">{metadata?.displayName}</span> */}
      <span className="text-white text-sm">{message.text}</span>
    </div>
  );
}

export default LocalMessageBubble;
