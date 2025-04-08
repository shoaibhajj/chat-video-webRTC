/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-constant-condition */
/* eslint-disable quotes */
import React, { useContext, useEffect, useRef } from "react";
import { Button, Grid, Zoom } from "@material-ui/core";
import PhoneIcon from '@material-ui/icons/Phone';
import incomingCall from "../audio/incoming-call.mp3";
import { SocketContext } from "../Context";

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  const outCallSound = useRef(null);

  useEffect(() => {
    if (call.isReceivingCall && !callAccepted) outCallSound.current.play();
  }, [call.isReceivingCall, callAccepted]);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <Grid
          container
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <Grid item xs={8} md={8}>
            <Zoom in={true} style={{ transitionDelay: true ? "500ms" : "0ms" }}>
              <h1>
                <span
                  style={{
                    color: " #06bb0f",
                    animation: "pulse 2s infinite",
                  }}
                >
                  {call.name}
                </span>{" "}
                is calling:
              </h1>
            </Zoom>
          </Grid>
          <Grid item xs={4} md={4}>
            <Zoom in={true} style={{ transitionDelay: true ? "500ms" : "0ms" }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={answerCall}
                style={{
                  background: "#06bb0f",
                  animation: "pulse 2s infinite",
                }}
                startIcon={<PhoneIcon />}
              >
                Answer
              </Button>
            </Zoom>
          </Grid>

          <audio ref={outCallSound} src={incomingCall} loop />
        </Grid>
      )}
    </>
  );
};

export default Notifications;
