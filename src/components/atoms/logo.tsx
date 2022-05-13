import { FC } from "react";

const Logo: FC = () => {
    return (
        <div style={{width:100, height: 100, display: "flex", justifyContent: "center", alignItems: "center"}}>
            <img src={require('../../assets/cohetelogo.png')} alt="logo" style={{width:70}}></img>
        </div>
    )
}

export default Logo