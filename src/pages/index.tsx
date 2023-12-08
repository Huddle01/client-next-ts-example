import { Inter } from "next/font/google";
import {
  useLocalAudio,
  useLocalPeer,
  useLocalVideo,
  usePeerIds,
  useRoom,
} from "@huddle01/react/hooks";
import { useEffect, useRef } from "react";
import RemotePeer from "@/component/RemotePeer/RemotePeer";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  token: string;
};

export default function Home({ token }: Props) {
  const { joinRoom, state } = useRoom({
    onJoin: (room) => {
      console.log("onJoin", room);
    },
    onPeerJoin: (peer) => {
      console.log("onPeerJoin", peer);
    },
  });

  const { enableVideo, isVideoOn, stream, disableVideo } = useLocalVideo();
  const { enableAudio, isAudioOn, stream: audioStream } = useLocalAudio();

  const { peerIds } = usePeerIds();

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  console.log({ audioStream, isAudioOn });

  console.log({ peerIds });

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <code className="font-mono font-bold">{state}</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <button
            type="button"
            className="bg-blue-500 p-2 mx-2"
            onClick={async () => {
              await joinRoom({
                roomId: "chq-anzn-chw",
                token,
              });
            }}
          >
            Join Room
          </button>
          <button
            className="bg-blue-500 p-2 mx-2"
            onClick={async () => {
              await enableVideo();
            }}
          >
            Enable Video
          </button>
          <button
            className="bg-blue-500 p-2 mx-2"
            onClick={async () => {
              await disableVideo();
            }}
          >
            Disable Video
          </button>
          <button
            className="bg-blue-500 p-2 mx-2"
            onClick={async () => {
              await enableAudio();
            }}
          >
            Enable Audio
          </button>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        {isVideoOn && (
          <video
            ref={videoRef}
            className="w-1/2 mx-auto border-2 rounded-xl border-blue-400"
            autoPlay
            muted
          />
        )}
      </div>

      <div className="mt-4 mb-32 grid gap-2 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {peerIds.map((peerId) =>
          peerId ? <RemotePeer key={peerId} peerId={peerId} /> : null
        )}
      </div>
    </main>
  );
}

export const getServerSideProps = async () => {
  const accessToken = new AccessToken({
    apiKey: "zMQHa6hH5hGrxfwYZp7z8I-1lWScI7UA",
    roomId: "mom-xnkh-lwh",

    role: Role.HOST,
    permissions: {
      admin: true,
      canConsume: true,
      canProduce: true,
      canProduceSources: {
        cam: true,
        mic: true,
        screen: true,
      },
      canRecvData: true,
      canSendData: true,
      canUpdateMetadata: true,
    },
    options: {
      metadata: {
        // you can add any custom attributes here which you want to associate with the user
        walletAddress: "0x29f54719E88332e70550cf8737293436E9d7b10b",
      },
    },
  });

  const token = await accessToken.toJwt();

  return {
    props: { token },
  };
};
