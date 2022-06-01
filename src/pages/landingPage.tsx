import { FC, useEffect, useState } from "react";
import LangingPageTemplate from "../components/templates/landingPageTemplate";
import MainTemplate from "../components/templates/mainTemplate";
import web3 from "../utils/web3";
import Campaign from "../eth/build/Campaign.json";
import factory from "../utils/factory";
import { ICampaign } from "../interfaces/Campaign";

const LandingPage: FC = () => {
    const [cantidad, setCantidad] = useState(0);
    const [campaignsData, setCampaignsData] = useState<ICampaign[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [address, setAddress] = useState("");

    const handleAddress = (add: string) => {
        setAddress(add);
    };

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const accounts = await web3.eth.getAccounts();
            if (accounts.length > 0) {
                let response: string[] = await factory.methods
                    .getDeployedCampaigns()
                    .call();
                setCantidad(response.length);
                if (response.length > 0) {
                    let campaingDataTemp: ICampaign[] = await Promise.all(
                        response.map(async (x) => {
                            const instance = new web3.eth.Contract(
                                Campaign.abi,
                                x
                            );
                            return {
                                title: await instance.methods.title().call(),
                                description: await instance.methods
                                    .description()
                                    .call(),
                                minimum: await instance.methods
                                    .minimumContribution()
                                    .call(),
                                address: x,
                            };
                        })
                    );
                    setCampaignsData(campaingDataTemp);
                }
            }

            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <MainTemplate>
            <LangingPageTemplate
                cantidad={cantidad}
                loading={loading}
                campaignsData={campaignsData}
                handleAddress={handleAddress}
                address={address}
            />
        </MainTemplate>
    );
};
export default LandingPage;
