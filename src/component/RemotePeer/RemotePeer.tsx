import { useRemoteVideo } from "@huddle01/react/hooks";
import React, { useEffect, useRef } from "react";

type Props = {
  peerId: string;
};

const RemotePeer = ({ peerId }: Props) => {
  const { track } = useRemoteVideo({ peerId });
  const vidRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (track && vidRef.current) {
      vidRef.current.srcObject = new MediaStream([track]);
    }
  }, [track]);

  return (
    <div>
      <video ref={vidRef} />
    </div>
  );
};

export default RemotePeer;
