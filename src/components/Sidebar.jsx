/* eslint-disable quotes */
import React, { useState, useContext, useRef } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Phone, PhoneDisabled } from "@material-ui/icons";
import LinkIcon from "@material-ui/icons/Link";
import { makeStyles } from "@material-ui/core/styles";
import { Bounce, toast, ToastContainer } from "react-toastify";
import ringTone from "../audio/ring-tone.mp3";

import { SocketContext } from "../Context";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  container: {
    width: "600px",
    margin: "35px 0",
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: "10px 20px",
    border: "2px solid #2ea7e4",
  },
}));

const Sidebar = ({ children }) => {
  const {
    me,
    callAccepted,
    name,
    setName,
    callEnded,
    leaveCall,
    callUser,
    startStream,
    userVideo,
  } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const outCallSound = useRef(null);

  useEffect(() => {
    if (!userVideo && callAccepted) leaveCall();
  }, [userVideo, callAccepted]);

  useEffect(() => {
    if (isCalling && !callAccepted) {
      outCallSound.current.play();
    } else outCallSound.current.pause();
  }, [isCalling, callAccepted]);

  console.log("userVideo", userVideo);
  console.log("callEnded", callEnded);

  const classes = useStyles();

  const notify = () => {
    toast.success("Now Send this invitaion to you friend", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      // eslint-disable-next-line no-undef
      transition: Bounce,
    });
  };
  const safeRefresh = () => {
    try {
      window.location.reload();
    } catch (error) {
      console.error("Refresh failed:", error);
      // Fallback method
      window.location.href = window.location.href;
    }
  };

  // useEffect(() => {
  //   if (!me) safeRefresh();
  // }, [me]);

  return (
    <Container maxWidth="md">
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container className={classes.gridContainer}>
          {children && (
            <Grid item xs={12} md={12} className={classes.padding}>
              {children}
            </Grid>
          )}

          <Grid item xs={12} md={6} className={classes.padding}>
            <Typography gutterBottom variant="h6">
              Account Info
            </Typography>

            <TextField
              label="Write Your Name !"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            {me && (
              <CopyToClipboard
                text={me}
                className={classes.margin}
                onCopy={() => {
                  setIsCopied(true);
                  startStream();
                  notify();
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  // disabled={isCopied}
                  startIcon={<LinkIcon fontSize="large" />}
                  style={{
                    background: " #2ea7e4",
                  }}
                >
                  {isCopied ? "Copied" : " Invite !"}
                </Button>
              </CopyToClipboard>
            )}
          </Grid>
          <Grid item xs={12} md={6} className={classes.padding}>
            <Typography gutterBottom variant="h6">
              Make a call
            </Typography>
            <TextField
              label="Invitaion ID to call"
              value={idToCall}
              onChange={(e) => setIdToCall(e.target.value)}
              fullWidth
              placeholder="Paste Your Friend Invitaion here to call "
            />
            {callAccepted && !callEnded ? (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<PhoneDisabled fontSize="large" />}
                fullWidth
                onClick={leaveCall}
                className={classes.margin}
              >
                Hang Up
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                startIcon={<Phone fontSize="large" />}
                fullWidth
                disabled={isCalling}
                onClick={() => {
                  startStream();
                  setIsCalling(true);
                  callUser(idToCall);
                }}
                className={classes.margin}
                style={{
                  background: " #2ea7e4",
                }}
              >
                Call
              </Button>
            )}
            <audio ref={outCallSound} src={ringTone} loop />
          </Grid>
        </Grid>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </Container>
  );
};

export default Sidebar;
