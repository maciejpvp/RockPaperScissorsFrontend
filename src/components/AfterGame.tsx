import Rock from "../rps-icons/rock.png";
import Paper from "../rps-icons/paper.png";
import Scissors from "../rps-icons/scissors.png";
import { motion } from "framer-motion";
import { Move } from "../types";
import { ChoiceCoin } from "./ChoiceCoin";
import { useEffect } from "react";
import socket from "../socket";

type AfterGameProps = {
  icon: Move;
  message: string | undefined;
  oppMove: string | undefined;
};

export const AfterGame = ({ icon, message, oppMove }: AfterGameProps) => {
  const AfterGameVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // useEffect(() => {
  //   socket.on("results", ({ message, oppMove }: resultsProps) => {
  //     setMessage(message);
  //     setOppMove(oppMove);
  //   });
  //   return () => {
  //     socket.off("results");
  //   };
  // }, []);

  console.log(oppMove);

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
            {message && (
              <p className="text-lg">{message === "You Won" ? "1-0" : "0-1"}</p>
            )}
          </div>
          {message && (
            <button className="bg-stone-950 px-6 py-3 rounded-lg mb-10">
              Play Again
            </button>
          )}
        </div>
        <ChoiceCoin
          choice={
            oppMove
              ? oppMove === "rock"
                ? Rock
                : oppMove === "paper"
                  ? Paper
                  : Scissors
              : "?"
          }
        />
      </motion.div>
    </div>
  );
};
