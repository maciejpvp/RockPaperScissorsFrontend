import Rock from "../rps-icons/rock.png";
import Paper from "../rps-icons/paper.png";
import Scissors from "../rps-icons/scissors.png";
import { motion } from "framer-motion";
import { Move } from "../types";
import { ChoiceCoin } from "./ChoiceCoin";
import { SetStateAction, useEffect, useState } from "react";
import socket from "../socket";
import { PlayAgainDialog } from "./PlayAgainDialog";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type AfterGameProps = {
  icon: Move;
  message: string | undefined;
  oppMove: string | undefined;
  gameId: string;
  yourPoints: number | undefined;
  oppPoints: number | undefined;
  setGameId: React.Dispatch<SetStateAction<string>>;
};

export const AfterGame = ({
  icon,
  message,
  oppMove,
  gameId,
  yourPoints,
  oppPoints,
  setGameId,
}: AfterGameProps) => {
  const { toast } = useToast();
  const [openPlayAgainDialog, setOpenPlayAgainDialog] =
    useState<boolean>(false);

  const [disablePlayAgainButton, setDisablePlayAgainButton] =
    useState<boolean>(false);

  const AfterGameVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const restartGameHandler = () => {
    console.log("restarting game");
    setDisablePlayAgainButton(true);
    socket.emit("play-again", { room: gameId });
  };

  useEffect(() => {
    socket.on("play-again-request", () => {
      console.log("playing again");
      setOpenPlayAgainDialog(true);
    });

    socket.on("play-again-rejected", () => {
      setDisablePlayAgainButton(false);
      setGameId("");
      toast({
        title: "Lobby Closed",
        description: "Opponent Rejected Revenge",
      });
    });

    return () => {
      socket.off("play-again-request");
      socket.off("play-again-rejected");
    };
  }, []);

  return (
    <>
      <PlayAgainDialog
        open={openPlayAgainDialog}
        setOpen={setOpenPlayAgainDialog}
        roomId={gameId}
        setGameId={setGameId}
      />
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
              <h1
                className={`font-semibold ${message ? "text-2xl" : "text-sm"}`}
              >
                {message ? message : "Waiting for Opponent"}
              </h1>
              {message && (
                <p className="text-lg">{`${yourPoints}-${oppPoints}`}</p>
              )}
            </div>
            {message && (
              <motion.button
                onClick={restartGameHandler}
                className={cn(
                  "bg-stone-950 px-6 py-3 rounded-lg mb-10",
                  disablePlayAgainButton ? "bg-stone-800 cursor-auto" : ""
                )}
                whileHover={
                  disablePlayAgainButton ? {} : { scale: 1.05, y: -2 }
                }
                whileTap={disablePlayAgainButton ? {} : { scale: 0.95 }}
                transition={{ duration: 0.1 }}
                disabled={disablePlayAgainButton}
              >
                Play Again
              </motion.button>
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
    </>
  );
};
