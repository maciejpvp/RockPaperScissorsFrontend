import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { motion } from "framer-motion";
import socket from "@/socket";

import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

type PlayAgainDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  roomId: string;
  setGameId: React.Dispatch<React.SetStateAction<string>>;
};

export const PlayAgainDialog = ({
  open,
  setOpen,
  roomId,
  setGameId,
}: PlayAgainDialogProps) => {
  const { toast } = useToast();
  const hasMounted = useRef(false);
  const handleAccept = () => {
    socket.emit("accept-play-again-request", { room: roomId });
  };

  const handleReject = () => {
    console.log("here");
    socket.emit("reject-play-again-request", { room: roomId });
    toast({
      title: "Lobby Closed",
      description: "You Rejected Revenge",
    });
    setGameId("");
  };

  useEffect(() => {
    if (hasMounted.current) {
      if (open === false) {
        handleReject();
      }
    } else {
      hasMounted.current = true;
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-stone-800 border-stone-900 text-stone-200">
        <DialogHeader>
          <DialogTitle className="flex justify-center">Play Again</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center flex-col items-center space-y-5">
          <h1 className="text-xl font-semibold">Accept Revange?</h1>
          <div className="flex flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.15 }}
              className="bg-green-800 px-20 py-4 rounded-md text-sm font-medium shadow-lg"
              onClick={handleAccept}
            >
              Accept
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.15 }}
              className="bg-red-800 px-20 py-4 rounded-md text-sm font-medium shadow-lg"
              onClick={() => setOpen(false)}
            >
              Decline
            </motion.button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
