import {
    makeStyles,
  } from "@material-ui/core";
  import { FC } from "react";
  import MainHeader from "../molecules/mainHeader";
import MainTemplate from "./mainTemplate";
  
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
  
  const LangingPageTemplate: FC = (props: any) => {
    const classes = useStyles()
    
    return (
      <>
      <MainTemplate >
            <MainHeader></MainHeader>
        </MainTemplate>
      </>
    );
  };
  
  export default LangingPageTemplate;
  