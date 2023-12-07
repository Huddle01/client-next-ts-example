import { useRemoteVideo } from "@huddle01/react/hooks";
import React, { useEffect, useRef } from "react";

type Props = {
  peerId: string;
};

const RemotePeer = ({ peerId }: Props) => {
  const { stream, state } = useRemoteVideo({ peerId });
  const vidRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log({ RemotePeer: peerId });

    if (stream && vidRef.current && state === "playable") {
      console.log("here 1");

      vidRef.current.srcObject = stream;

      vidRef.current?.play();
      // vidRef.current.onloadedmetadata = async () => {
      //   try {
      //     console.log("here 2");
      //   } catch (error) {
      //     console.error(error);
      //   }
      // };

      vidRef.current.onerror = () => {
        console.error("videoCard() | Error is hapenning...");
      };
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
