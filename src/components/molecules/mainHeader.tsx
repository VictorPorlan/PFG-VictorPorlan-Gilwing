import { makeStyles, Typography } from "@material-ui/core";
import { Card } from "@mui/material";
import { FC } from "react";
import image from "../../assets/Gilwing1.png"

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
        gridTemplateRows: "140px 1fr 1fr",
        gridTemplateColumns: "1fr",
        gridTemplateAreas: `
        'header'
        'cards'
        'cards'
        `,
    },
    width: "95%",
    justifySelf: "center",
    alignSelf: "center",
    marginTop: "50px",
    display: "grid",
    gridTemplateRows: "140px 1fr",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateAreas: `
    'header header'
    'cards cards'
    `,
  },

  secondaryCard: {
    [theme.breakpoints.down('md')]: {
      gridRow:3,
      marginTop: 40,
  },
    display:'flex',
    gridRow: "2",
    textAlign: "center",
    width: "60%",
    height: "70%",
    justifySelf: "flex-end",
    alignSelf: "center",
    padding: 20,
    alignItems:"center",
    justifyContent: "center",
    marginRight: 50,
    marginBottom: 50
  },

  subtitle: {
    gridRow: "2",
    justifySelf: "center",
    alignSelf: "center",
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
    height:"50%",
    paddingLeft:50,
    marginBottom: 50
  },
}));

interface IProps {
  cantidad: number
}

const MainHeader: FC<IProps> = ({cantidad}) => {
  const classes = useStyles();

  return (
    
      <Card className={classes.root}>
        <div
          style={{
            gridArea: "header",
            display: "flex",
            justifyContent: "center",
            marginTop:"40px"
          }}
        >
          <img
            src={image}
            alt="logo"
            style={{ justifySelf: "center" }}
          ></img>
        </div>

        <div
          className={ classes.subtitle }
        >
          <Typography variant="h3" style={{ color:"#ba87fa", fontFamily:"Oswald" }}>
            La app de donaciones y mecenazgo totalmente descentralizada
          </Typography>
          <Typography variant="h5">
            Para la gente que busca una plataforma totalmente transparente y segura para llevar a cabo sus proyectos con total honestidad.
          </Typography>
        </div>
        <Card
          className={classes.secondaryCard}
          sx={{ backgroundColor: "#31313C" }}
        >
           <Typography variant="h3" style={{ fontFamily:"Oswald" }}>
            Proyectos creados con Gilwing: 
          <Typography variant="h3" style={{ color:"#ba87fa", fontFamily:"Oswald" }}>
            {cantidad}
          </Typography>
          </Typography>
        </Card>
      </Card>

  );
};

export default MainHeader;
