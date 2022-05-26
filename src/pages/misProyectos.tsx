import { FC, useEffect, useState } from "react"
import MainTemplate from "../components/templates/mainTemplate"
import MisProyectosTemplate from "../components/templates/misProyectosTemplate"
import web3 from "../utils/web3";
import Campaign from "../eth/build/Campaign.json";
import factory from "../utils/factory";
import { ICampaign } from "../interfaces/Campaign";

const MisProyectos: FC = () => {
    const [campaignsData, setCampaignsData] = useState<ICampaign[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        async function fetchData(){
            setLoading(true)
            const accounts = await web3.eth.getAccounts();
            if(accounts.length > 0){
            const response: string[] = await factory.methods
            .allMyCampaigns(accounts[0])
            .call();
            
            if(response.length > 0){
                let campaingDataTemp: ICampaign[] = await Promise.all(response.map(async(x) => {
                    const instance = new web3.eth.Contract(Campaign.abi, x);
                    return {
                      title: await instance.methods.title().call(),
                      description: await instance.methods.description().call(),
                      minimum: await instance.methods.minimumContribution().call(),
                      address: x
                    };

                }))
                setCampaignsData(campaingDataTemp)
            }}
            setLoading(false)
        }
        fetchData()
    },[])

    return (
        <>
            <MainTemplate>
                <MisProyectosTemplate campaigns={campaignsData} loading={loading}></MisProyectosTemplate>
            </MainTemplate>
        </>
        )
}

export default MisProyectos