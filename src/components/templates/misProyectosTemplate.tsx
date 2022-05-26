import { Button, Card } from "@mui/material";
import { FC } from "react";
import { ICampaign } from "../../interfaces/Campaign";
import { makeStyles, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import LoadingDialog from "../molecules/loadingDialog";
import CardDisplay from "../organisms/cardDisplay";

interface IProps {
    campaigns?: ICampaign[];
    loading: boolean;
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

}));

const MisProyectosTemplate: FC<IProps> = ({ campaigns, loading }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    return !loading ? (
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
                            Cantidad: {campaigns?.length}
                        </Typography>
                    </div>
                </Card>
                <div className={classes.root}>
                    {campaigns?.map((x) => {
                        return (
                            <CardDisplay title={x.title} description={x.description} address={x.address}/>
                        );
                    })}
                    {campaigns?.length === 0 ? (
                        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                            <Typography
                                variant="h4"
                                style={{
                                    fontFamily: "Oswald",
                                    color: "#ba87fa",
                                }}
                                align="center"
                            >
                                No se han encontrado campañas
                            </Typography>
                            <Typography
                                variant="h5"
                                style={{
                                    fontFamily: "Oswald",
                                    color: "#ba87fa",
                                }}
                                align="center"
                            >
                                Pulsa este botón para acceder a la página de
                                creación de campañas
                            </Typography>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => navigate("/crear")}
                                style={{width:"100px", margin: 20}}
                            >
                                Crear
                            </Button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    ) : (
        <LoadingDialog
            message={"Cargando, por favor espere..."}
            open={loading}
        />
    );
};
export default MisProyectosTemplate;
