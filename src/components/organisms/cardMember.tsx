import { makeStyles } from "@material-ui/core";
import { Card, Typography } from "@mui/material";
import { FC } from "react";
import { IMember } from "../../interfaces/Campaign";
import web3 from "../../utils/web3";

const useStyles = makeStyles((theme) => ({
    card: {
        padding: 30,
        display: "flex",
        justifyContent: "space-between",
    },
    subText: {
        width: "90%",
    },
    icon: {
        alignSelf: "center",
    },
}));

const CardMember: FC<{ member: IMember }> = ({ member }) => {
    const classes = useStyles();
    const isSmall = window.innerWidth < 720 

    return (
        <Card
            className={classes.card}
            style={{ margin: "20px 0px" }}
            key={member.address}
        >
            <div style={{ width: "100%" }}>
                <div
                    style={{
                        borderBottom: "solid 2px #ba87fa",
                        width: "100%",
                        marginBottom: 20,
                    }}
                >
                    <Typography
                        variant="h3"
                        style={{
                            color: "#ba87fa",
                            fontFamily: "Oswald",
                            marginBottom: 20,
                            textAlign: "center",
                        }}
                    >
                        {member.name}
                    </Typography>
                    <Typography
                        variant="h6"
                        style={{
                            marginBottom: 20,
                            textAlign: "center",
                            maxWidth:isSmall ? "50vw" : "none"
                        }}
                        noWrap
                    >
                        {member.address}
                    </Typography>
                </div>
                <div>
                    {member.donations.map((x) => {
                        return (
                            <div key={x.amount + x.comment}>
                                <Typography
                                    variant="h6"
                                    style={{
                                        fontFamily: "Oswald",
                                        marginBottom: 20,

                                    }}
                                >
                                    {x.comment}
                                </Typography>
                                <Typography
                                    variant="h5"
                                    style={{
                                        margin: "0px 0px 30px",
                                    }}
                                    className={classes.subText}
                                >
                                    {web3.utils.fromWei(x.amount, "ether")} eth
                                </Typography>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Card>
    );
};

export default CardMember;
