import pusherServer from "pusher";
import pusherClient from "pusher-js";

export const pusherServerClient = new pusherServer({
  appId: process.env.PUSHER_APP_ID!, // PUSHER_APP_ID
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, // PUSHER_APP_KEY
  secret: process.env.PUSHER_SECRET!, // PUSHER_APP_SECRET
  cluster: "eu",
  useTLS: true,
});

export const pusherClientt = new pusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  {
    cluster: "eu",
  }
);
