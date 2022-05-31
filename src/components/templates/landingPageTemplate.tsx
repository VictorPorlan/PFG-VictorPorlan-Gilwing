import { makeStyles } from "@material-ui/core";
import { FC } from "react";
import { ICampaign } from "../../interfaces/Campaign";
import LoadingDialog from "../molecules/loadingDialog";
import MainHeader from "../molecules/mainHeader";
import CardDisplay from "../organisms/cardDisplay";

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
}

const LangingPageTemplate: FC<IProps> = ({
    cantidad,
    campaignsData,
    loading,
}) => {
    const classes = useStyles();
    const isSmall = window.innerWidth < 720;

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
