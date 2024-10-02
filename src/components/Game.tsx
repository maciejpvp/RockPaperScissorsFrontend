import Rock from "../rps-icons/rock.png";
import Paper from "../rps-icons/paper.png";
import Scissors from "../rps-icons/scissors.png";
import { GameButton } from "./GameButton";
import { useEffect, useState } from "react";
// import { AfterGame } from "./AfterGame";
import { Move } from "../types";
import { AfterGame } from "./AfterGame";

export const Game = ({ gameId }: { gameId: string }) => {
  const [selected, setSelected] = useState<Move>(undefined);
  const [showAfterGame, setShowAfterGame] = useState<boolean>(false);

  useEffect(() => {
    if (selected && ["rock", "paper", "scissors"].includes(selected))
      setTimeout(() => {
        setShowAfterGame(true);
      }, 200);
  }, [selected]);

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
        {showAfterGame && <AfterGame icon={selected} />}
      </div>
    </>
  );
};
