/* eslint-disable no-lone-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function ExplainCard({ image, title, sort }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Avatar
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "1rem",
              background: "#e3f9ff",
              color: "#00b0e9",
            }}
          >
            {sort}
          </Avatar>
          <Typography
            gutterBottom
            variant="p"
            color="textPrimary"
            component="p"
            style={{
              color: "#45453f",
              fontSize: "1rem",
            }}
          >
            {title}
          </Typography>
        </CardContent>
        <CardMedia
          className={classes.media}
          image={image}
          title={title}
          style={{
            backgroundSize: "contain",
            width: "100%",
          }}
        />
      </CardActionArea>
    </Card>
  );
}

export default ExplainCard;
