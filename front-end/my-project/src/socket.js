import { io } from "socket.io-client";

const socket = io(import.meta.VITE_LOCAL_URL, {
  withCredentials: true,
  autoConnect: false,  
});
 

export default socket;
