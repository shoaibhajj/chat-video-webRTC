/* eslint-disable quotes */
import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

// const socket = io('http://localhost:5000');
const socket = io("https://socketoi-backend-production.up.railway.app", {
  transports: ["websocket"],
});
// const socket = io('https://d99f-149-34-244-131.ngrok-free.app');

// const socket = io('https://warm-wildwood-81069.herokuapp.com');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  console.log("socket", socket);
  useEffect(() => {
    // navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    //   .then((currentStream) => {
    //     setStream(currentStream);

    //     myVideo.current.srcObject = currentStream;
    //   });

    socket.on("me", (id) => setMe(id));

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };
  const startStream = async () => {
    try {
      const stream2 = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(stream2);
      myVideo.current.srcObject = stream2;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to get media devices:", err);
    }
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        startStream,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
