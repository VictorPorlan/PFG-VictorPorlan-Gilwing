import {
    makeStyles,
  } from "@material-ui/core";
  import { FC } from "react";
  import MainHeader from "../molecules/mainHeader";
  
  const useStyles = makeStyles(() => ({
    content: {
      width: "100%",
      display: "flex",
      justifyContent: "center"
    },
    
  }));
  
  const LangingPageTemplate: FC = (props: any) => {
    const classes = useStyles()
    
    return (
      <>
        <div className={classes.content}>
            <MainHeader></MainHeader>
        </div>

      </>
    );
  };
  
  export default LangingPageTemplate;
  