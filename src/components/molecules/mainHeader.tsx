import { makeStyles } from "@material-ui/core";
import { Card } from "@mui/material";
import { FC } from "react";
const useStyles = makeStyles(() => ({
  root: {
    height: "95%",
    width: "95%",
    justifySelf: "center",
    alignSelf: "center",
    display: "grid",
    gridTemplateRows: "100px 1fr",
    gridTemplateColumns: "1fr 1fr",
  },

  secondaryCard: {
    gridRow: "2",
  },
}));

const MainHeader: FC = () => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <Card className={classes.secondaryCard}>dasdasdas</Card>
        <Card className={classes.secondaryCard}>fdfsafds</Card>
      </Card>
    </>
  );
};

export default MainHeader;
