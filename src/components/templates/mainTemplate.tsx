import {
  makeStyles,
} from "@material-ui/core";import { FC } from "react";
import Logo from "../atoms/logo";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#121212",
    width:100,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyItems: "start"
  },
  
}));

const MainTemplate: FC = (props: any) => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.root}>
          <Logo></Logo>
      </div>
    </>
  );
};

export default MainTemplate;
