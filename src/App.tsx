import { useEffect, useState } from "react";
import socket from "./socket";
import { motion } from "framer-motion";
import { Game } from "./components/Game";

export const App = () => {
  const [gameId, setGameId] = useState<string>("");
  const [clicked, setClicked] = useState<boolean>(false);
  const [waiting, setWaiting] = useState<boolean>(false);

  const handleJoinQueue = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
      setWaiting(true);
      setTimeout(() => {
        socket.emit("join-queue");
      }, 600);
    }, 100);
  };

  useEffect(() => {
    socket.on("lobby-created", ({ roomId }: { roomId: string }) => {
      console.log(roomId);
      setGameId(roomId);
    });

    return () => {
      socket.off("lobby-created");
    };
  }, []);

  return (
    <div className="bg-stone-900 h-dvh flex flex-col justify-center items-center">
      <h1 className="text-stone-400 text-4xl absolute top-[25dvh]">
        Rock Paper Scissors
      </h1>
      {gameId !== "" ? (
        <Game gameId={gameId} />
      ) : (
        <div>
          <motion.button
            onClick={handleJoinQueue}
            className={`px-12 py-5 rounded-md text-lg text-green-100 shadow-lg shadow-black ${
              waiting ? "bg-gray-600" : "bg-green-800"
            }`}
            whileHover={{ scale: clicked ? 0.0 : waiting ? 1 : 1.1 }}
            animate={{ scale: clicked ? 0.6 : 1 }}
            disabled={waiting}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          >
            {waiting ? "Waiting for Lobby" : "Join Queue"}
          </motion.button>
        </div>
      )}
    </div>
  );
};
