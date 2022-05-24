import { Button, Card, TextField } from "@mui/material";
import { FC } from "react";
import { makeStyles, Typography } from "@material-ui/core";
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
        display: "grid",
        gridTemplateRows: "1fr",
    },
    text: {
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

interface IProps {
    titulo: string;
    descripcion: string;
    minimo: number;
    message: string;
    finished: boolean;
    open: boolean;
    handleOnPressDialog: () => void;
    handleTitulo: (titulo: string) => void;
    handleDescripcion: (descripcion: string) => void;
    handleMinimo: (minimo: number) => void;
    handleCreate: () => void;
}

const CrearTemplate: FC<IProps> = ({
    titulo,
    descripcion,
    minimo,
    message,
    finished,
    open,
    handleTitulo,
    handleDescripcion,
    handleMinimo,
    handleCreate,
    handleOnPressDialog
}) => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.content}>
                <Card className={classes.root}>
                    <div className={classes.text}>
                        <Typography
                            variant="h3"
                            style={{ color: "#ba87fa", fontFamily: "Oswald", marginBottom: 20 }}
                        >
                            Crea tu propio proyecto
                        </Typography>
                        <Typography variant="h5">
                            Escribe un título, una descripción de tu proyecto, y
                            un mínimo de donaciones (Wei)
                        </Typography>
                    </div>
                    <div className={classes.form}>
                        <TextField
                            label="Título"
                            color={"primary"}
                            margin={"dense"}
                            style={{ margin: "0px 30px 10px 0px" }}
                            value={titulo}
                            onChange={(e) => handleTitulo(e.target.value)}
                            required
                        />
                        <TextField
                            label="Descripción"
                            color={"primary"}
                            margin={"dense"}
                            style={{ margin: "0px 30px 10px 0px" }}
                            value={descripcion}
                            onChange={(e) => handleDescripcion(e.target.value)}
                            required
                        />
                        <TextField
                            type={"number"}
                            label="Donación mínima"
                            color={"primary"}
                            margin={"dense"}
                            style={{ margin: "0px 30px 10px 0px" }}
                            value={minimo}
                            onChange={(e) =>
                                handleMinimo(parseInt(e.target.value))
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
                            }}
                            onClick={handleCreate} 
                        >
                            Crear
                        </Button>
                    </div>
                </Card>
            </div>
            <LoadingDialog message={message} open={open} finished={finished} onPress={handleOnPressDialog}/>
        </>
    );
};

export default CrearTemplate;
