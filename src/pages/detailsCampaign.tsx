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
    const [campaignData, setCampaignData] = useState<ICampaign>();
    const [nombre, setNombre] = useState("");
    const [comentario, setComentario] = useState("");
    const [campaign, setCampaign] = useState<any>();
    const [cantidad, setCantidad] = useState("0");
    useEffect(() => {
        async function fetchData() {
            const deployedCampaigns: string[] = await factory.methods
                .getDeployedCampaigns()
                .call();
            if (address && deployedCampaigns.includes(address)) {
                const instance = new web3.eth.Contract(Campaign.abi, address);
                let campaign: ICampaign = {
                    title: await instance.methods.title().call(),
                    description: await instance.methods.description().call(),
                    minimum: (await instance.methods
                        .minimumContribution()
                        .call()).toString(),
                    address: address,
                };
                setCampaignData(campaign);
                setCantidad(web3.utils.fromWei(campaign.minimum.toString(), 'ether'));
                setCampaign(instance);
            } else {
                navigate("/");
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNewDonator = async () => {
        const accounts = await web3.eth.getAccounts();
        console.log(cantidad)
        await campaign.methods
            .newDonatorContribution(nombre, comentario)
            .send({ from: accounts[0], value: web3.utils.toWei(cantidad)});
    };

    const handleNombre = (titulo: string) => {
        setNombre(titulo);
    };

    const handleComentario = (descripcion: string) => {
        setComentario(descripcion);
    };

    const handleCantidad = (cantidad: string) => {
      setCantidad(cantidad);
  };

    return (
        <>
            <MainTemplate>
                <DetailsCampaignTemplate
                    campaignData={campaignData as ICampaign}
                    nombre={nombre}
                    comentario={comentario}
                    cantidad={cantidad}
                    handleComentario={handleComentario}
                    handleNombre={handleNombre}
                    handleTransaction={handleNewDonator}
                    handleCantidad={handleCantidad}
                ></DetailsCampaignTemplate>
            </MainTemplate>
        </>
    );
};

export default DetailsCampaign;
