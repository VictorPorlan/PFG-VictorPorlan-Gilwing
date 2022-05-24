import { FC, useEffect, useState } from "react"
import MainTemplate from "../components/templates/mainTemplate"
import MisProyectosTemplate from "../components/templates/misProyectosTemplate"
import factory from "../utils/factory";
import web3 from "../utils/web3";

const MisProyectos: FC = () => {
    const [campaigns, setCamapaigns] = useState<[]>([]);

    useEffect(() => {
        async function fetchData(){
            const accounts = await web3.eth.getAccounts();
            const response = await factory.methods
            .allMyCampaigns(accounts[0])
            .call();
            console.log(response)
            setCamapaigns(response)
        }
        fetchData()
    },[])
    return (
        <>
            <MainTemplate>
                <MisProyectosTemplate campaigns={campaigns}></MisProyectosTemplate>
            </MainTemplate>
        </>
    )
}
export default MisProyectos