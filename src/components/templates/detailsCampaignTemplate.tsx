import { Button, Card, TextField } from "@mui/material";
import { FC } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { ICampaign, IMember } from "../../interfaces/Campaign";
import LoadingDialog from "../molecules/loadingDialog";
import CardMember from "../organisms/cardMember";
import web3 from "../../utils/web3";
import CardDisplay from "../organisms/cardDisplay";
import ErrorDialog from "../molecules/errorDialog";

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
    buttons: {
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        },
    },
    bottom: {
        padding: "25px 0px 50px",
        width: "95%",
        justifySelf: "center",
        alignSelf: "center",
        display: "grid",
        gridTemplateColumns: "5fr 2fr",
        [theme.breakpoints.down("md")]: {
            gridTemplateColumns: "1fr",
        },
    },
    sideForm: {
        display: "flex",
        margin: "20px 0px 0px 20px",
        alignSelf: "start",
        flexDirection: "column",
        [theme.breakpoints.down("md")]: {
            gridRow: 0,
            margin: "20px 0px 0px 0px",
        },
    },
    cardDisplayer: {
        marginTop: 20,
        [theme.breakpoints.down("md")]: {
            gridRow: 3,
        },
    }
}));

interface IProps {
    campaignData: ICampaign;
    nombre: string;
    comentario: string;
    cantidad: string;
    isManager: boolean;
    selectedDonations: boolean;
    member?: IMember;
    description: string;
    recipient: string;
    cantidadTransact: string;
    message: string;
    finished: boolean;
    open: boolean;
    balance:string;
    error: boolean;
    handleNombre: (x: string) => void;
    handleComentario: (x: string) => void;
    handleCantidad: (x: string) => void;
    handleTransaction: () => void;
    handleSelectDonation: (x: boolean) => void;
    handleCantidadTransact: (x: string) => void;
    handleDescription: (x: string) => void;
    handleRecipient: (x: string) => void;
    handleMakeTransaction: () => void;
}

const DetailsCampaignTemplate: FC<IProps> = ({
    campaignData,
    nombre,
    comentario,
    cantidad,
    member,
    selectedDonations,
    isManager,
    description,
    recipient,
    cantidadTransact,
    open,
    message,
    finished,
    balance,
    error,
    handleNombre,
    handleComentario,
    handleCantidad,
    handleTransaction,
    handleSelectDonation,
    handleRecipient,
    handleDescription,
    handleMakeTransaction,
    handleCantidadTransact,
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
                     <ErrorDialog
                        error={error}
                        title="Ha ocurrido un error en la transacción"
                        message={
                        `Es posible que el fallo haya sido ocasionado por una falta de gas
                        o por un fallo de conexión`}
                        onPress={() => window.location.reload()}
                    />
                    <LoadingDialog
                        open={open}
                        finished={finished}
                        message={message}
                        onPress={() => window.location.reload()}
                    />
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
                            <Typography
                                variant="h4"
                                style={{
                                    fontFamily: "Oswald",
                                    textAlign: "center",
                                    marginTop: 20,
                                }}
                            >
                                {balance} eth
                            </Typography>
                        </div>
                    </Card>
                    <div className={classes.bottom}>
                        <div className={classes.cardDisplayer}>
                            <div className={classes.buttons}>
                                <Button
                                    variant="contained"
                                    color={
                                        selectedDonations
                                            ? "primary"
                                            : "secondary"
                                    }
                                    style={{
                                        width: "100%",
                                    }}
                                    onClick={() => handleSelectDonation(true)}
                                >
                                    Donaciones
                                </Button>
                                <Button
                                    variant="contained"
                                    color={
                                        selectedDonations
                                            ? "secondary"
                                            : "primary"
                                    }
                                    style={{
                                        width: "100%",
                                    }}
                                    onClick={() => handleSelectDonation(false)}
                                >
                                    Transacciones
                                </Button>
                            </div>
                            {selectedDonations ? (
                                <div>
                                    {campaignData.members?.map((x) => {
                                        return (
                                            <CardMember
                                                member={x}
                                                key={x.address}
                                            />
                                        );
                                    })}
                                </div>
                            ) : (
                                <div>
                                    {campaignData.transactions?.map((x, i) => {
                                        return (
                                            <CardDisplay
                                                title={
                                                    web3.utils.fromWei(
                                                        x.value,
                                                        "ether"
                                                    ) + " eth"
                                                }
                                                address={x.recipient}
                                                description={x.description}
                                                key={x.recipient + i}
                                                disableChevron
                                                disableCursor
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        <Card className={classes.sideForm}>
                            {isManager ? (
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
                                        Transacción
                                    </Typography>

                                    <TextField
                                        label="Descripción"
                                        color={"primary"}
                                        margin={"dense"}
                                        value={description}
                                        style={{
                                            margin: "0px 30px 20px 0px",
                                            width: "100%",
                                        }}
                                        onChange={(e) =>
                                            handleDescription(e.target.value)
                                        }
                                        required
                                    />

                                    <TextField
                                        label="Receptor (dirección)"
                                        color={"primary"}
                                        margin={"dense"}
                                        value={recipient}
                                        style={{
                                            margin: "0px 30px 20px 0px",
                                            width: "100%",
                                        }}
                                        onChange={(e) =>
                                            handleRecipient(e.target.value)
                                        }
                                        required
                                    />
                                    <TextField
                                        label="Cantidad (Eth)"
                                        color={"primary"}
                                        margin={"dense"}
                                        value={cantidadTransact}
                                        style={{
                                            margin: "0px 30px 20px 0px",
                                            width: "100%",
                                        }}
                                        onChange={(e) =>
                                            handleCantidadTransact(
                                                e.target.value
                                            )
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
                                        onClick={handleMakeTransaction}
                                    >
                                        Iniciar transacción
                                    </Button>
                                </div>
                            ) : (
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
                                        {member?.exists
                                            ? "Donar de nuevo"
                                            : "Donar"}
                                    </Typography>

                                    {member?.exists ? (
                                        <Typography
                                            variant="h4"
                                            style={{
                                                fontFamily: "Oswald",
                                                marginBottom: 20,
                                            }}
                                        >
                                            {member?.name}
                                        </Typography>
                                    ) : (
                                        <TextField
                                            label="Nombre"
                                            color={"primary"}
                                            margin={"dense"}
                                            value={nombre}
                                            style={{
                                                margin: "0px 30px 20px 0px",
                                                width: "100%",
                                            }}
                                            onChange={(e) =>
                                                handleNombre(e.target.value)
                                            }
                                        />
                                    )}
                                    <TextField
                                        label="Comentario"
                                        color={"primary"}
                                        margin={"dense"}
                                        value={comentario}
                                        style={{
                                            margin: "0px 30px 20px 0px",
                                            width: "100%",
                                        }}
                                        onChange={(e) =>
                                            handleComentario(e.target.value)
                                        }
                                    />

                                    <TextField
                                        label="Cantidad (Eth)"
                                        color={"primary"}
                                        margin={"dense"}
                                        value={cantidad}
                                        error={
                                            parseFloat(
                                                web3.utils.fromWei(
                                                    campaignData.minimum.toString(),
                                                    "ether"
                                                )
                                            ) > parseFloat(cantidad)
                                        }
                                        style={{
                                            margin: "0px 30px 20px 0px",
                                            width: "100%",
                                        }}
                                        onChange={(e) =>
                                            handleCantidad(e.target.value)
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
                                        disabled={
                                            parseFloat(
                                                web3.utils.fromWei(
                                                    campaignData.minimum.toString(),
                                                    "ether"
                                                )
                                            ) > parseFloat(cantidad)
                                        }
                                        onClick={handleTransaction}
                                    >
                                        Iniciar transacción
                                    </Button>
                                    <Typography
                                        style={{
                                            textAlign: "center",
                                            marginTop: 20,
                                        }}
                                    >
                                        {member?.exists
                                            ? `La cantidad mostrada para la donación es la
                                        mínima para donar. Cualquier cantidad por
                                        debajo de esta resultará en un ERROR EN LA
                                        TRANSACCIÓN. Al realizar una nueva donación se 
                                        guardará en el perfil de donante que se creó
                                        en su primera donación con el nombre que seleccionó
                                        en su momento.`
                                            : `La cantidad mostrada para la donación es la
                                        mínima para donar. Cualquier cantidad por
                                        debajo de esta resultará en un ERROR EN LA
                                        TRANSACCIÓN. La donación puede mandarse sin
                                        nombre ni comentario en el caso de que se
                                        quiera realizar con algo más de anonimato.`}
                                    </Typography>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            )}
        </>
    );
};

export default DetailsCampaignTemplate;
