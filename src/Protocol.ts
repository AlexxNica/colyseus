import * as msgpack from "notepack.io";
import { Client } from "./index";

export enum Protocol {
  // Use codes between 0~127 for lesser throughput (1 byte)

  // User-related (1~10)
  USER_ID = 1,

  // Cluster messages (server-side)
  PASS_HTTP_SOCKET = 3,
  PASS_WEBSOCKET = 4,
  REQUEST_JOIN_ROOM = 8,
  CREATE_ROOM = 9,

  // Room-related (10~20)
  JOIN_ROOM = 10,
  JOIN_ERROR = 11,
  LEAVE_ROOM = 12,
  ROOM_DATA = 13,
  ROOM_STATE = 14,
  ROOM_STATE_PATCH = 15,

  // Generic messages (50~60)
  BAD_REQUEST = 50,
}

export function decode (message: any) {
  try {
    message = msgpack.decode(Buffer.from(message));

  } catch (e) {
    console.error("Couldn't decode message:", message, e.stack);
    return;
  }

  return message;
}

export function send (client: Client, message: any[]) {
  client.send(msgpack.encode(message), { binary: true });
}
