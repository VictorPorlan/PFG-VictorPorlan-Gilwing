import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import MainTemplate from "../components/templates/mainTemplate";
import web3 from "../utils/web3";
import Campaign from "../eth/build/Campaign.json";
import factory from "../utils/factory";
import DetailsCampaignTemplate from "../components/templates/detailsCampaignTemplate";
import { ICampaign } from "../interfaces/Campaign";

const DetailsCampaign: FC = () => {
  const { address } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<any>();
  const [campaignData, setCampaignData] = useState<ICampaign>();

  useEffect(() => {
    async function fetchData() {
      // const accounts = await web3.eth.getAccounts()
      const deployedCampaigns: string[] = await factory.methods
        .getDeployedCampaigns()
        .call();
      if (address && deployedCampaigns.includes(address)) {
        const instance = new web3.eth.Contract(Campaign.abi, address);
        let campaign: ICampaign = {
          title: await instance.methods.title().call(),
          description: await instance.methods.description().call(),
          minimum: await instance.methods.minimumContribution().call(),
          address: address
        };
        setCampaignData(campaign)
        setCampaign(instance);
      } else {
        navigate("/");
      }
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MainTemplate>
        <DetailsCampaignTemplate campaign={campaign} campaignData= {campaignData as ICampaign}></DetailsCampaignTemplate>
      </MainTemplate>
    </>
  );
};

export default DetailsCampaign;
