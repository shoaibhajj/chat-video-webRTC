/* eslint-disable no-lone-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
import React, { useEffect, useState } from "react";
import {
  Typography,
  AppBar,
  Container,
  Grid,
  Button,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import VideoPlayer from "./components/VideoPlayer";
import Sidebar from "./components/Sidebar";
import Notifications from "./components/Notifications";
import ExplainCard from "./components/ExplainCard";
import { ToastContainer } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 100px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "600px",
    border: "2px solid #2ea7e4",

    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  image: {
    marginLeft: "15px",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

const App = () => {
  const classes = useStyles();
  const [first, setFirst] = useState(false);

  return (
    <>
      {first && (
        <Container maxWidth="md">
          <div className={classes.wrapper}>
            <VideoPlayer />
            <Sidebar>
              <Notifications />
            </Sidebar>
          </div>
        </Container>
      )}
      {!first && (
        <>
          <Container maxWidth="md">
            <Grid
              container
              spacing={3}
              style={{
                justifyContent: "center",
                marginTop: "10%",
              }}
            >
              <Grid item xs={12}>
                <Typography
                  variant="h1"
                  color="primary"
                  align="center"
                  style={{
                    fontSize: "40px",
                    color: "#2ea7e4",
                  }}
                >
                  Talky...
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography
                  variant="h6"
                  component="p"
                  color="textSecondary"
                  align="center"
                >
                  Truly simple video chat and screen sharing between 2
                  people
                </Typography>
              </Grid>
              <Grid item xs={3} />
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{
                    background: "#2ea7e4",
                    width: "100%",
                  }}
                  onClick={() => {
                    setFirst(true);
                  }}
                >
                  Start Chat
                </Button>
              </Grid>
              <Grid item xs={3} />
              <Grid
                item
                xs={12}
                style={{
                  marginTop: "1rem",
                }}
              >
                <Divider />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  marginTop: "1rem",
                }}
              ></Grid>
              <Grid container spacing={3} xs={12}>
                <Grid item xs={12} md={4}>
                  <ExplainCard
                    title="Enter a name or click “Start a Chat” to create your room"
                    image="../first.png"
                    sort="1"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <ExplainCard
                    title="Send your room link to the people you wanna Talky with"
                    image="../two.png"
                    sort="2"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <ExplainCard
                    title="Send your room link to the people you wanna Talky with"
                    image="../three.png"
                    sort="3"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </>
  );
};

export default App;
