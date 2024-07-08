"use client";

import { useEffect, useState } from "react";
import { socket } from "../chat/socket";

export default function Chat() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    console.log("Initializing socket connection");

    function onConnect() {
      console.log("Connected to server");
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport: any) => {
        console.log("Transport upgraded:", transport.name);
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      console.log("Disconnected from server");
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error");
    };
  }, []);

  return (
    <div>
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>
    </div>
  );
}
