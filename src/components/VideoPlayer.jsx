import React, { useContext } from "react";
import {
  Grid,
  Typography,
  Paper,
  makeStyles,
  Container,
  Button,
} from "@material-ui/core";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import { SocketContext } from "../Context";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "400px",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
    margin: "10px",
  },
}));

const VideoPlayer = () => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    callUser,
    startStream,
  } = useContext(SocketContext);
  const classes = useStyles();

  console.log("myVideo", myVideo);
  console.log("userVideo", userVideo);
  console.log("callUser", callUser);

  return (
    <Container maxWidth="md">
      <Grid
        container
        className={classes.gridContainer}
        justify="center"
        spacing={1}
      >
        {/* {stream && ( */}
        <Grid item xs={12} md={12}>
          <Typography
            variant="h4"
            component="p"
            gutterBottom
            style={{
              textAlign: "center",
              marginTop: "2rem",
            }}
          >
            Ready to join a{" "}
            <span
              style={{
                color: "#2ea7e4",
                fontSize: "2rem",
              }}
            >
              Talky
            </span>{" "}
            video chat?
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} justify="center">
          <Typography
            variant="p"
            component="p"
            gutterBottom
            noWrap={false}
            color="textSecondary"
            style={{
              textAlign: "center",
            }}
          >
            Talky is truly simple video chat and screen sharing for groups.
            Learn more about talky.
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={5}
          style={{
            marginRight: "0.25rem",
          }}
        >
          <Typography variant="h5" gutterBottom>
            {name ||"You"}
          </Typography>
          <Grid
            style={{
              background: !stream && "#454545",
            }}
          >
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Grid>
        {!stream && (
          <Grid
            item
            xs={12}
            md={5}
            style={{
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Typography
              variant="h6"
              component="p"
              gutterBottom
              color="textSecondary"
            >
              <svg viewBox="0 0 24 24" width="1em" height="1em">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"></path>
              </svg>
              Camera:
            </Typography>
            <Button
              variant="outlined"
              color="default"
              startIcon={<VideoCallIcon />}
              onClick={startStream}
            >
              Allow camera access
            </Button>
            <Typography
              variant="h6"
              component="p"
              gutterBottom
              color="textSecondary"
            >
              <svg viewBox="0 0 24 24" width="1em" height="1em">
                <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"></path>
                <path d="M0 0h24v24H0z" fill="none"></path>
              </svg>
              Microphone:
            </Typography>
            <button onClick={startStream} type="button"></button>
            <Button
              variant="outlined"
              color="default"
              startIcon={<KeyboardVoiceIcon />}
              onClick={startStream}
            >
              Allow microphone access
            </Button>
          </Grid>
        )}
        <Grid xs={12} md={1} />
        {callAccepted && !callEnded && (
          <Grid item xs={12} md={5}>
            <Typography variant="h5" gutterBottom>
              {call.name || "Name"}
            </Typography>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default VideoPlayer;
