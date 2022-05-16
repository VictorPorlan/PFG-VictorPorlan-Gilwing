import { Button } from "@mui/material";
import { FC, useCallback } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

interface IProps {
  children: JSX.Element,
  text: string,
  url: string
}

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#31313C",
    width: 100,
    height: 100,
    display: "flex",
    flexDirection: "column",
    justifyItems: "start",
    borderRadius: "20%",
  },
  
}));

const SidenavButton: FC<IProps> = ({ children, text, url }) => {
  const classes = useStyles();
  const navigate = useNavigate()
  const handleRedirect = useCallback(() => {
    navigate(url)
  },[navigate, url])
  return (
    <>
      <Button className={classes.root} disableRipple sx={{border: 0}} onClick={handleRedirect}>
        {children}  
        <Typography style={{fontSize: "12px",color: "white"}}>
            {text}
        </Typography>
      </Button>
    </>
  );
};

export default SidenavButton;
