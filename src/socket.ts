import { io, Socket } from "socket.io-client";

const URL = "http://localhost:8000"; // Adres serwera
const socket: Socket = io(URL);

export default socket;
