import { motion } from "framer-motion";
import socket from "../socket";
import { Move } from "../types";

type GameButtonProps = {
  icon: string;
  value: Move;
  gameId: string;
  onClick: React.Dispatch<React.SetStateAction<Move>>;
};

export const GameButton = ({
  icon,
  gameId,
  value,
  onClick,
}: GameButtonProps) => {
  const handleSentMove = () => {
    onClick(value);
    socket.emit("make-move", {
      choice: value,
      room: gameId,
    });
  };

  return (
    <motion.button
      onClick={handleSentMove}
      className="bg-stone-800 p-10 rounded-full"
      whileHover={{ scale: 1.1, y: -15 }}
      whileTap={{ scale: 0.9 }}
    >
      <img src={icon} />
    </motion.button>
  );
};
