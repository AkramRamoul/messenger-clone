import React from "react";
import { MessageType } from "../types";

function Body({ intialMessages }: { intialMessages: MessageType[] }) {
  return <div className="flex-1 overflow-y-auto">Body</div>;
}

export default Body;
