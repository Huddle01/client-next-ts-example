import {
  useRemoteAudio,
  useRemoteScreenShare,
  useRemoteVideo,
} from '@huddle01/react/hooks';
import React, { useEffect, useRef } from 'react';

type Props = {
  peerId: string;
};

const RemotePeer = ({ peerId }: Props) => {
  const { stream, state } = useRemoteVideo({ peerId });
  const { stream: audioStream, state: audioState } = useRemoteAudio({ peerId });
  const { videoStream: screenVideo, audioStream: screenAudio } =
    useRemoteScreenShare({ peerId });
  const vidRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const screenVideoRef = useRef<HTMLVideoElement>(null);
  const screenAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    console.log('stream', stream);
    if (stream && vidRef.current && state === 'playable') {
      vidRef.current.srcObject = stream;

      vidRef.current.onloadedmetadata = async () => {
        try {
          vidRef.current?.play();
        } catch (error) {
          console.error(error);
        }
      };

      vidRef.current.onerror = () => {
        console.error('videoCard() | Error is hapenning...');
      };
    }
  }, [stream]);

  useEffect(() => {
    if (audioStream && audioRef.current && audioState === 'playable') {
      audioRef.current.srcObject = audioStream;

      audioRef.current.onloadedmetadata = async () => {
        try {
          audioRef.current?.play();
        } catch (error) {
          console.error(error);
        }
      };

      audioRef.current.onerror = () => {
        console.error('videoCard() | Error is hapenning...');
      };
    }
  }, [audioStream]);

  useEffect(() => {
    if (screenVideo && screenVideoRef.current) {
      screenVideoRef.current.srcObject = screenVideo;

      screenVideoRef.current.onloadedmetadata = async () => {
        try {
          screenVideoRef.current?.play();
        } catch (error) {
          console.error(error);
        }
      };

      screenVideoRef.current.onerror = () => {
        console.error('videoCard() | Error is hapenning...');
      };
    }
  }, [screenVideo]);

  useEffect(() => {
    if (screenAudio && screenAudioRef.current) {
      screenAudioRef.current.srcObject = screenAudio;

      screenAudioRef.current.onloadedmetadata = async () => {
        try {
          screenAudioRef.current?.play();
        } catch (error) {
          console.error(error);
        }
      };

      screenAudioRef.current.onerror = () => {
        console.error('videoCard() | Error is hapenning...');
      };
    }
  }, [screenAudio]);

  return (
    <div className="flex flex-col gap-2">
      <video
        ref={vidRef}
        autoPlay
        muted
        className="border-2 rounded-xl border-white-400 aspect-video"
      />
      {screenVideo && (
        <video
          ref={screenVideoRef}
          autoPlay
          muted
          className="border-2 rounded-xl border-white-400 aspect-video"
        />
      )}
      <audio ref={audioRef} autoPlay></audio>
      {screenAudio && <audio ref={screenAudioRef} autoPlay></audio>}
    </div>
  );
};

export default React.memo(RemotePeer);
