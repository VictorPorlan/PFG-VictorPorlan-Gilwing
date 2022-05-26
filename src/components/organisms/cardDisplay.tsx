import { makeStyles } from "@material-ui/core";
import { Card, Typography } from "@mui/material";
import { FC } from "react"
import { useNavigate } from "react-router";
import Chevron from "@mui/icons-material/ChevronRight";

interface IProps{
    title: string;
    description :string;
    address: string;
}

const useStyles = makeStyles((theme) => ({
    card: {
        padding: 30,
        cursor: "pointer",
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

const CardDisplay:FC<IProps> = ({title, description, address}) => {
    const classes = useStyles();
    const navigate = useNavigate();
    return(
            <Card
                className={classes.card}
                style={{ margin: "20px 0px" }}
                onClick={() =>
                    navigate(`/campaigns/${address}`)
                }
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
                    <Typography
                        variant="h6"
                        className={classes.subText}
                    >
                        {description}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        style={{ marginTop: 10 }}
                        className={classes.subText}
                    >
                        {address}
                    </Typography>
                </div>
                <Chevron
                    color="primary"
                    className={classes.icon}
                    sx={{ fontSize: 60 }}
                />
            </Card>    )
}

export default CardDisplay