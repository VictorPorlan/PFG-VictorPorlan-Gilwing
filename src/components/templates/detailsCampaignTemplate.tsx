import { Card } from "@mui/material";
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
    campaignData: ICampaign;
    campaign: any;
}

const DetailsCampaignTemplate: FC<IProps> = ({ campaign, campaignData }) => {
    const classes = useStyles();
    return (
        <>
            {campaign === undefined ? (
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
                </div>
            )}
        </>
    );
};

export default DetailsCampaignTemplate;
