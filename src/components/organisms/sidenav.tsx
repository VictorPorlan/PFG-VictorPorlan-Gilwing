import {
    makeStyles,
  } from "@material-ui/core";
  import { FC } from "react";
  import Logo from "../atoms/logo";
  import SidenavButton from "../atoms/sidenavButton";
  import Wallet from '@mui/icons-material/AccountBalanceWallet';
  import SavingsIcon from '@mui/icons-material/Savings';
  import Plus from '@mui/icons-material/Add';

  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "#1C1C1F",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyItems: "start",
      position: "fixed",
      overflowX: "hidden",
      [theme.breakpoints.down('md')]: {
        flexDirection: "row",
        height: "100px",
        width:"100vw",
    },
  }
    
  }));
  
  const Sidenav: FC = (props: any) => {
    const classes = useStyles()
    
    return (
      <>
        <div className={classes.root}>
            <Logo></Logo>
            <SidenavButton text={"Donaciones"} url="/donations">
              <Wallet fontSize="large" sx={{color: "#ba87fa"}}></Wallet>
            </SidenavButton>
            <SidenavButton text={"Campañas"} url="/campaigns">
              <SavingsIcon fontSize="large" sx={{color: "#ba87fa"}}></SavingsIcon>
            </SidenavButton>
            <SidenavButton text={"crear"} url="/crear">
              <Plus fontSize="large" sx={{color: "#ba87fa"}}></Plus>
            </SidenavButton>
        </div>
      </>
    );
  };
  
  export default Sidenav;
  