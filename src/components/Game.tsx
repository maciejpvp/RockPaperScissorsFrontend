import Rock from "../rps-icons/rock.png";
import Paper from "../rps-icons/paper.png";
import Scissors from "../rps-icons/scissors.png";
import { GameButton } from "./GameButton";
import { SetStateAction, useEffect, useState } from "react";
// import { AfterGame } from "./AfterGame";
import socket from "../socket";
import { Move } from "../types";
import { AfterGame } from "./AfterGame";

export type resultsProps = {
  message: string;
  oppMove: Move;
  yourPoints: number;
  oppPoints: number;
};

export const Game = ({
  gameId,
  setGameId,
}: {
  gameId: string;
  setGameId: React.Dispatch<SetStateAction<string>>;
}) => {
  const [selected, setSelected] = useState<Move>(undefined);
  const [showAfterGame, setShowAfterGame] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [oppMove, setOppMove] = useState<string | undefined>(undefined);
  const [yourPoints, setYourPoints] = useState<number | undefined>(undefined);
  const [oppPoints, setOppPoints] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (selected && ["rock", "paper", "scissors"].includes(selected))
      setTimeout(() => {
        setShowAfterGame(true);
      }, 200);
  }, [selected]);

  useEffect(() => {
    socket.on(
      "results",
      ({ message, oppMove, yourPoints, oppPoints }: resultsProps) => {
        setMessage(message);
        setOppMove(oppMove);
        setYourPoints(yourPoints);
        setOppPoints(oppPoints);
      },
    );

    socket.on("play-again-accepted", () => {
      setSelected(undefined);
      setShowAfterGame(false);
      setMessage(undefined);
      setOppMove(undefined);
    });

    return () => {
      socket.off("results");
      socket.off("play-again-accepted");
    };
  }, []);

  return (
    <>
      <div className="flex flex-row gap-10">
        {!showAfterGame && (selected === undefined || selected === "rock") && (
          <GameButton
            icon={Rock}
            gameId={gameId}
            value="rock"
            isSelected={selected === "rock"}
            onSelect={setSelected}
          />
        )}
        {!showAfterGame && (selected === undefined || selected === "paper") && (
          <GameButton
            icon={Paper}
            gameId={gameId}
            value="paper"
            isSelected={selected === "paper"}
            onSelect={setSelected}
          />
        )}
        {!showAfterGame &&
          (selected === undefined || selected === "scissors") && (
            <GameButton
              icon={Scissors}
              gameId={gameId}
              value="scissors"
              isSelected={selected === "scissors"}
              onSelect={setSelected}
            />
          )}
        {showAfterGame && (
          <AfterGame
            icon={selected}
            message={message}
            oppMove={oppMove}
            gameId={gameId}
            setGameId={setGameId}
            yourPoints={yourPoints}
            oppPoints={oppPoints}
          />
        )}
      </div>
    </>
  );
};
