import { motion } from "framer-motion";
import socket from "../socket";
import { Move } from "../types";
import { AfterGame } from "./AfterGame";

type GameButtonProps = {
  icon: string;
  value: Move;
  gameId: string;
  isSelected: boolean;
  onSelect: React.Dispatch<React.SetStateAction<Move>>;
};

export const GameButton = ({
  icon,
  gameId,
  value,
  isSelected,
  onSelect,
}: GameButtonProps) => {
  const handleSentMove = () => {
    onSelect(value);
    setTimeout(() => {
      socket.emit("make-move", {
        choice: value,
        room: gameId,
      });
    }, 400);
  };

  const boxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 },
    main: { scale: 2, right: "280px", opacity: 1 },
  };

  return (
    <>
      <motion.button
        onClick={handleSentMove}
        className="bg-stone-800 p-10 rounded-full relative overflow-visible caret-transparent"
        initial="hidden"
        animate={isSelected ? "main" : "visible"}
        exit="exit"
        variants={boxVariants}
        transition={{ duration: 0.2 }}
        whileHover={isSelected ? {} : { scale: 1.1, y: -15 }}
        whileTap={isSelected ? {} : { scale: 0.9 }}
      >
        <img src={icon} />
      </motion.button>
    </>
  );
};
