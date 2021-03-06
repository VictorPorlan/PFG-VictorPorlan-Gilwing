import { makeStyles } from "@material-ui/core";
import { Card, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router";
import Chevron from "@mui/icons-material/ChevronRight";

interface IProps {
    title: string;
    description: string;
    address: string;
    disableCursor?: boolean;
    disableChevron?: boolean;
}

const useStyles = makeStyles((theme) => ({
    card: {
        padding: 30,
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
    },
    cardNoCursor: {
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

const CardDisplay: FC<IProps> = ({
    title,
    description,
    address,
    disableChevron,
    disableCursor,
}) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const isSmall = window.innerWidth < 720;

    return (
        <Card
            className={disableCursor ? classes.cardNoCursor : classes.card}
            style={{ margin: "20px 0px" }}
            onClick={() => navigate(`/campaigns/${address}`)}
            key={address}
        >
            <div>
                <Typography
                    variant="h4"
                    style={{
                        color: "#ba87fa",
                        fontFamily: "Oswald",
                        marginBottom: 20,
                    }}
                >
                    {title}
                </Typography>
                <Typography variant="h6" className={classes.subText}>
                    {description}
                </Typography>
                <Typography
                    variant="subtitle2"
                    style={{ marginTop: 10, maxWidth:isSmall ? "50vw" : "none"
                }}
                    className={classes.subText}
                    noWrap
                >
                    {address}
                </Typography>
            </div>
            {disableChevron ? (
                <></>
            ) : (
                <Chevron
                    color="primary"
                    className={classes.icon}
                    sx={{ fontSize: 60 }}
                />
            )}
        </Card>
    );
};

export default CardDisplay;
