import Rock from "../rps-icons/rock.png";
import Paper from "../rps-icons/paper.png";
import Scissors from "../rps-icons/scissors.png";
import { GameButton } from "./GameButton";
import { useState } from "react";
import { AfterGame } from "./AfterGame";
import { Move } from "../types";

export const Game = ({ gameId }: { gameId: string }) => {
  const [played, setPlayed] = useState<Move>();

  return (
    <>
      {played ? (
        <AfterGame icon={played} />
      ) : (
        <div className="flex flex-row gap-10">
          <GameButton
            icon={Rock}
            gameId={gameId}
            value="rock"
            onClick={setPlayed}
          />
          <GameButton
            icon={Paper}
            gameId={gameId}
            value="paper"
            onClick={setPlayed}
          />
          <GameButton
            icon={Scissors}
            gameId={gameId}
            value="scissors"
            onClick={setPlayed}
          />
        </div>
      )}
    </>
  );
};
