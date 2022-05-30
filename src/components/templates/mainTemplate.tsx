import {
  makeStyles,
} from "@material-ui/core";
import { FC } from "react";
import Sidenav from "../organisms/sidenav";

const useStyles = makeStyles((theme) => ({
  root:{
    display:"flex",
    flexDirection:"row",
    height:"100%",
    minHeight: "100vh",
    [theme.breakpoints.down('md')]: {
      flexDirection: "row",
  },
  },
  content: {
    width:'100%',
    backgroundColor:"#31313C",
    marginLeft:100,
    [theme.breakpoints.down('md')]: {
      marginLeft:0,
      maxWidth: "100%",
      marginTop: 100,

  },
  },
  
}));

const MainTemplate: FC<any> = ({children}) => {
  const classes = useStyles()
  
  return (
    <>
    <div className={classes.root}>
      <Sidenav />
        <div className={classes.content}>
          {children}
        </div>
      </div>
    </>
  );
};

export default MainTemplate;
