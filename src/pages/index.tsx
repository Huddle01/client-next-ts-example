import Image from "next/image";
import { Inter } from "next/font/google";
import {
  useLocalPeer,
  useLocalVideo,
  usePeerIds,
  useRoom,
} from "@huddle01/react/hooks";
import { useEffect, useRef } from "react";
import RemotePeer from "@/component/RemotePeer/RemotePeer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { joinRoom } = useRoom({
    onJoin: (room) => {
      console.log("onJoin", room);
    },
    onPeerJoin: (peer) => {
      console.log("onPeerJoin", peer);
    },
  });

  const { enableVideo, isVideoOn, track } = useLocalVideo();
  const { peerIds } = usePeerIds();

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (track && videoRef.current) {
      videoRef.current.srcObject = new MediaStream([track]);
    }
  }, [track]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/pages/index.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <button
            type="button"
            className="bg-blue-500 p-2 mx-2"
            onClick={async () => {
              await joinRoom({
                roomId: "kto-qnki-bwd",
                token:
                  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb29tSWQiOiJrdG8tcW5raS1id2QiLCJyb2xlIjoiaG9zdCIsInBlcm1pc3Npb25zIjp7ImFkbWluIjp0cnVlLCJjYW5Db25zdW1lIjp0cnVlLCJjYW5Qcm9kdWNlIjp0cnVlLCJjYW5Qcm9kdWNlU291cmNlcyI6eyJjYW0iOnRydWUsIm1pYyI6dHJ1ZSwic2NyZWVuIjp0cnVlfSwiY2FuU2VuZERhdGEiOnRydWUsImNhblJlY3ZEYXRhIjp0cnVlLCJjYW5VcGRhdGVNZXRhZGF0YSI6dHJ1ZX0sIm1ldGFkYXRhIjoie1wid2FsbGV0QWRkcmVzc1wiOlwiYXhpdC5ldGhcIn0iLCJwZWVySWQiOiJwZWVySWQtMjhQN2RLV25WLVV5dTVCdE1CbldRIiwicHVycG9zZSI6IlNESyIsInJvb21JbmZvIjp7InJvb21Mb2NrZWQiOmZhbHNlLCJtdXRlT25FbnRyeSI6ZmFsc2UsInJvb21UeXBlIjoiVklERU8iLCJ2aWRlb09uRW50cnkiOmZhbHNlfSwiaWF0IjoxNzAxODc4NjQ0LCJleHAiOjE3MDE4ODk0NDQsImlzcyI6Imh1ZGRsZTAxIn0.Q13XfiCBohZKTHXglp1s1WIolX62AfiGnlj3xtqdh05PfY7iZwoDIzhGFF1Ri1kGpHQMFNyZsZx65InOBY3q2rNtf-nI3YM1DueH3tZ6sfc3Q_YKZyXJcgMHcTbqa-GG_N2jvABqHRbUXDwLsF4q24CtIzeVZvMyI2HB9vFs1TQcoG_wU2Sp0f7QMfvnKJcWRKCH07kxvjjzgpJ-Mkq0R8JZB96cS9KL-rtJIHEQmnJvW_SxP6_j0rqAkfDx59JTuCmj6PNILIaA6EuRfO9aHPXGHJjsj69hlCuOixCN6OtZImvLC1hy5YzauqlyZ0dPA4n1LaUowS24ATliyv6Vz9UwXarekZpU4iGIMwGzmnpyKd6vsENxs_Vn8n0KA86o828zMpL7hPdmiDeDxnX_fXFie4Hpqa5nzwG-cp2msUZjPU8bnLCRnDdK4MFP9ZN-nyByYSnRXAbn3t1AgJKWw9-QplktKRkdjyoFkGLbSnugrfDPIHPwUpIKEBp0ckWrM5REwrjg6iKgXZgWQAcQGCL7CpiDf_lhSydL2PwDMq51udc9wFQeSDeq1AYUXpyfLM3dSquFcQBNI0cgXlfVOKqlVEh21X84n76Z1MXdMgEQK9Kl4aWj0r9KcJHWR8E6TNHLu73fjoi-eWOz4n-DlnZ81GgkPHa-w-pMDyUOdkM",
              });
            }}
          >
            joinRoom
          </button>
          <button
            className="bg-blue-500 p-2"
            onClick={async () => {
              await enableVideo();
            }}
          >
            enableVideo
          </button>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        {/* <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        /> */}

        <video ref={videoRef} autoPlay muted />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {peerIds.map((peerId) => (
          <RemotePeer key={peerId} peerId={peerId} />
        ))}
      </div>
    </main>
  );
}
