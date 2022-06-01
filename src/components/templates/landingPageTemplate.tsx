import { makeStyles } from "@material-ui/core";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { ICampaign } from "../../interfaces/Campaign";
import LoadingDialog from "../molecules/loadingDialog";
import MainHeader from "../molecules/mainHeader";
import CardDisplay from "../organisms/cardDisplay";
import Search from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
    content: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
    },
}));

interface IProps {
    cantidad: number;
    loading: boolean;
    campaignsData: ICampaign[];
    address: string; 
    handleAddress: (x: string) => void;
}

const LangingPageTemplate: FC<IProps> = ({
    cantidad,
    campaignsData,
    loading,
    address,
    handleAddress
}) => {
    const classes = useStyles();
    const isSmall = window.innerWidth < 720;
    const navigate = useNavigate()

    return (
        <>
            {!loading ? (
            <>
                <div className={classes.content}>
                    <MainHeader cantidad={cantidad}></MainHeader>
                    <div
                        style={{
                            width: "95%",
                            justifySelf: "center",
                            alignSelf: "center",
                            marginTop: "50px",
                        }}
                    >
                        <div style={{display: "flex", alignItems: "center"}}>
                         <TextField
                            label="Buscar Dirección"
                            color={"primary"}
                            margin={"dense"}
                            style={{ width:"100%" }}
                            value={address}
                            onChange={(e) => handleAddress(e.target.value)}
                            required
                        />
                        <IconButton onClick={() => navigate(`campaigns/${address}`)} disabled={address === ""}>
                        <Search fontSize="large" sx={{color:address === "" ? "grey" : "#ba87fa"}}/>
                        </IconButton>
                        </div>
                        {campaignsData?.map((x) => {
                            return (
                                <CardDisplay
                                    title={x.title}
                                    description={x.description}
                                    address={x.address}
                                    key={x.address}
                                    disableChevron={isSmall}
                                />
                            );
                        })}
                        {campaignsData?.length === 0 ? (
                        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}} key={"key"}>
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
                                Aún no hay ningúna campaña creada en gilwing. ¡Se el primero en crear una y empieza ya a usar los beneficios de la blockchain y la descentralización!
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
            )
            }
        </>
    );
};

export default LangingPageTemplate;
