import {
  makeStyles,
} from "@material-ui/core";
import { FC } from "react";
import MainHeader from "../molecules/mainHeader";
import Sidenav from "../organisms/sidenav";

const useStyles = makeStyles(() => ({
  root:{
    display:"flex",
    flexDirection:"row",
    height:"100vh"
  },
  content: {
    width:'100%',
    backgroundColor:"#31313C",
    marginLeft:100,
    display:"grid",
    gridTemplateRows:"500px 1fr"

  },
  
}));

const MainTemplate: FC = (props: any) => {
  const classes = useStyles()
  
  return (
    <>
    <div className={classes.root}>
      <Sidenav />
        <div className={classes.content}>
          <MainHeader></MainHeader>
        </div>
      </div>
    </>
  );
};

export default MainTemplate;
