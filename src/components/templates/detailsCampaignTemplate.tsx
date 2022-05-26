import { Button, Card, TextField } from "@mui/material";
import { FC } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { ICampaign } from "../../interfaces/Campaign";
import LoadingDialog from "../molecules/loadingDialog";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "95%",
        justifySelf: "center",
        alignSelf: "center",
        marginTop: "50px",
    },
    content: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },
    text: {
        padding: 50,
    },
    bottom: {
        padding: "25px 50px 50px",
        display: "grid",
        gridTemplateColumns: "5fr 2fr",
        [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "1fr",
        },
    },
    sideForm: {
        display: "flex",
        width: "95%",
        marginTop: "50px",
        flexDirection: "column",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "row",
        },
    },
}));

interface IProps {
    campaignData: ICampaign;
    nombre: string;
    comentario: string;
    cantidad: number
    handleNombre: (x: string) => void;
    handleComentario: (x: string) => void;
    handleCantidad: (x: number) => void;
    handleTransaction: () => void;
}

const DetailsCampaignTemplate: FC<IProps> = ({
    campaignData,
    nombre,
    comentario,
    cantidad,
    handleNombre,
    handleComentario,
    handleCantidad,
    handleTransaction,
}) => {
    const classes = useStyles();
    return (
        <>
            {campaignData === undefined ? (
                <LoadingDialog
                    open={true}
                    finished={false}
                    message={"Cargando, por favor espere..."}
                />
            ) : (
                <div className={classes.content}>
                    <Card className={classes.root}>
                        <div className={classes.text}>
                            <Typography
                                variant="h3"
                                style={{
                                    color: "#ba87fa",
                                    fontFamily: "Oswald",
                                    textAlign: "center",
                                }}
                            >
                                {campaignData.title}
                            </Typography>
                            <Typography
                                variant="h5"
                                style={{
                                    textAlign: "center",
                                    marginTop: 20,
                                }}
                            >
                                {campaignData.description}
                            </Typography>
                        </div>
                    </Card>
                    <div className={classes.bottom}>
                        <div>dasdasdasds</div>
                        <Card className={classes.root}>
                            <div className={classes.text}>
                                <Typography
                                    variant="h3"
                                    style={{
                                        color: "#ba87fa",
                                        fontFamily: "Oswald",
                                        textAlign: "center",
                                        marginBottom: "20px",
                                    }}
                                >
                                    Donar
                                </Typography>

                                <TextField
                                    label="Nombre"
                                    color={"primary"}
                                    margin={"dense"}
                                    value={nombre}
                                    style={{
                                        margin: "0px 30px 10px 0px",
                                        width: "100%",
                                    }}
                                    onChange={(e) =>
                                        handleNombre(e.target.value)
                                    }
                                />
                                <TextField
                                    label="Comentario"
                                    color={"primary"}
                                    margin={"dense"}
                                    value={comentario}
                                    style={{
                                        margin: "0px 30px 10px 0px",
                                        width: "100%",
                                    }}
                                    onChange={(e) =>
                                        handleComentario(e.target.value)
                                    }
                                />

                                <TextField
                                    type={"number"}
                                    label="Cantidad (Wei)"
                                    color={"primary"}
                                    margin={"dense"}
                                    value={cantidad}
                                    style={{
                                        margin: "0px 30px 10px 0px",
                                        width: "100%",
                                    }}
                                    onChange={(e) =>
                                        handleCantidad(parseInt(e.target.value))
                                    }
                                    required
                                />

                                <Button
                                    variant="contained"
                                    style={{
                                        marginLeft: "auto",
                                        height: 56,
                                        marginRight: 30,
                                        marginBottom: 10,
                                        width: "100%",
                                    }}
                                    onClick={handleTransaction}
                                >
                                    Iniciar transacción
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            )}
        </>
    );
};

export default DetailsCampaignTemplate;
