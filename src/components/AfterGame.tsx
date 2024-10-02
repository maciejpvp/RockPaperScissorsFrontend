import Rock from "../rps-icons/rock.png";
import Paper from "../rps-icons/paper.png";
import Scissors from "../rps-icons/scissors.png";
import { motion } from "framer-motion";
import { Move } from "../types";
import { ChoiceCoin } from "./ChoiceCoin";
import { useState } from "react";

type AfterGameProps = {
  icon: Move;
};

export const AfterGame = ({ icon }: AfterGameProps) => {
  const [message, setMessage] = useState<string | undefined>();

  const AfterGameVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="flex flex-row w-[900px] justify-center">
      <ChoiceCoin
        choice={icon === "rock" ? Rock : icon === "paper" ? Paper : Scissors}
      />
      <motion.div
        variants={AfterGameVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.3 }}
        className="flex flex-row"
      >
        <div className="flex flex-col justify-between items-center text-stone-100 mt-10 gap-2 mx-10">
          <div className="flex flex-col items-center">
            <h1 className={`font-semibold ${message ? "text-2xl" : "text-md"}`}>
              {message ? message : "Waiting for Opponent"}
            </h1>
            {message && <p className="text-lg">1-0</p>}
          </div>
          {message && (
            <button className="bg-stone-950 px-6 py-3 rounded-lg mb-10">
              Play Again
            </button>
          )}
        </div>
        <ChoiceCoin choice="?" />
      </motion.div>
    </div>
  );
};
