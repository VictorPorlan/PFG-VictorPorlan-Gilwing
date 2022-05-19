import { Button } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router";
import image from "../../assets/cohetelogo.png"

const Logo: FC = () => {
    const navigate = useNavigate()

    return (
        <Button style={{width:100, height: 100, display: "flex", justifyContent: "center", alignItems: "center"}} onClick={() => navigate("/")}>
            <img src={image} alt="logo" style={{width:70}}></img>
        </Button>
    )
}

export default Logo