import { useRemoteVideo } from "@huddle01/react/hooks";
import React, { useEffect, useRef } from "react";

type Props = {
  peerId: string;
};

const RemotePeer = ({ peerId }: Props) => {
  const { stream, state } = useRemoteVideo({ peerId });

  const vidRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (stream && vidRef.current && state === "playable") {
      vidRef.current.srcObject = stream;
      vidRef.current?.play();
    }
  }, [stream, state]);

  return (
    <div>
      <video
        ref={vidRef}
        autoPlay
        muted
        className="border-2 rounded-xl border-blue-400 aspect-video"
      />
    </div>
  );
};

export default React.memo(RemotePeer);
