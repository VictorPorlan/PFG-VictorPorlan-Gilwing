import { Card } from "@mui/material";
import { FC } from "react";
import { ICampaign } from "../../interfaces/Campaign";
import { makeStyles, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import LoadingDialog from "../molecules/loadingDialog";

interface IProps {
    campaigns?: ICampaign[];
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: "95%",
        justifySelf: "center",
        alignSelf: "center",
        marginTop: "50px",
    },

    content: {
        width: "100%",
        display: "grid",
        gridTemplateRows: "1fr",
    },
    text: {
        padding: 50,
        display: "flex",
        justifyContent: "space-between",
    },
    card: {
        padding: 50,
       
    },
    form: {
        padding: "25px 50px 50px",
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        },
    },
}));

const MisProyectosTemplate: FC<IProps> = ({ campaigns }) => {
    const classes = useStyles();
    const navigate = useNavigate()

    return campaigns !== undefined && campaigns.length !== 0 ? (
        <>
            <div className={classes.content}>
                <Card className={classes.root}>
                    <div className={classes.text}>
                        <Typography
                            variant="h3"
                            style={{ color: "#ba87fa", fontFamily: "Oswald" }}
                        >
                            Mis campañas
                        </Typography>
                        <Typography
                            variant="h3"
                            style={{ color: "#ba87fa", fontFamily: "Oswald" }}
                        >
                            Cantidad: {campaigns.length}
                        </Typography>
                    </div>
                </Card>
                <div className={classes.root}>
                    {campaigns.map((x) => {
                        return (
                            <Card
                                className={classes.card}
                                style={{ margin: "20px 0px" }}
                                onClick={() => navigate(`/campaigns/${x.address}`)}
                                key={x.address}
                            >
                                <Typography
                                    variant="h5"
                                    style={{
                                        color: "#ba87fa",
                                        fontFamily: "Oswald",
                                        marginBottom: 20,
                                    }}
                                >
                                    {x.title}
                                </Typography>
                                <Typography variant="h6">
                                    {x.description}
                                </Typography>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </>
    ) : (
        <LoadingDialog message={"Cargando, por favor espere..."} open={campaigns?.length === 0}/>
    );
};
export default MisProyectosTemplate;
