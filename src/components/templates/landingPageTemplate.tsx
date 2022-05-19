import {
    makeStyles,
  } from "@material-ui/core";
  import { FC } from "react";
  import MainHeader from "../molecules/mainHeader";
import MainTemplate from "./mainTemplate";
  
  const useStyles = makeStyles(() => ({
    content: {
      width:'100%',
      display:"grid",
      gridTemplateRows:"500px 1fr"
    },
    
  }));
  
  const LangingPageTemplate: FC = (props: any) => {
    const classes = useStyles()
    
    return (
      <>
      <MainTemplate >
        <div className={classes.content}>
            <MainHeader></MainHeader>
        </div>
        </MainTemplate>
      </>
    );
  };
  
  export default LangingPageTemplate;
  