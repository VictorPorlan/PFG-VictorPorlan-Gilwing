import { FC, useEffect, useState } from "react";
import LangingPageTemplate from "../components/templates/landingPageTemplate";
import MainTemplate from "../components/templates/mainTemplate";
import web3 from "../utils/web3";
import Campaign from "../eth/build/Campaign.json";
import factory from "../utils/factory";
import { ICampaign } from "../interfaces/Campaign";

const LandingPage: FC = () => {
    const [campaignsData, setCampaignsData] = useState<ICampaign[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const accounts = await web3.eth.getAccounts();
            if (accounts.length > 0) {
                const response: string[] = await factory.methods
                    .deployedCampaigns()
                    .call();
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <MainTemplate>
            <LangingPageTemplate />
        </MainTemplate>
    );
};
export default LandingPage;
