"use client";

import { ReactNode, useEffect, useState } from "react";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";

import Loader from "@/app/components/Loader";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
if (!API_KEY) {
  throw new Error("Stream API key is missing. Please check your .env.local file.");
}

const tokenProvider = async () => {
  try {
    const response = await fetch("/api/get-stream-token");
    if (!response.ok) throw new Error("Failed to fetch token");

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error("Error fetching Stream token:", error);
    throw error;
  }
};

const StreamClientProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const initClient = async () => {
      const client = new StreamVideoClient({
        apiKey: API_KEY!,
        user: {
          id: user.id,
          name: user.username || user.id,
          image: user.imageUrl,
        },
        tokenProvider,
      });

      setVideoClient(client);
    };

    initClient();

    return () => {
      videoClient?.disconnectUser();
    };
  }, [user, isLoaded]);

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamClientProvider;
