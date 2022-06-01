import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import MainTemplate from "../components/templates/mainTemplate";
import web3 from "../utils/web3";
import Campaign from "../eth/build/Campaign.json";
import factory from "../utils/factory";
import DetailsCampaignTemplate from "../components/templates/detailsCampaignTemplate";
import { ICampaign, IDonation, IMember, ITransaction } from "../interfaces/Campaign";

const DetailsCampaign: FC = () => {
    const { address } = useParams();
    const navigate = useNavigate();
    const [campaignData, setCampaignData] = useState<ICampaign>();
    const [nombre, setNombre] = useState("");
    const [comentario, setComentario] = useState("");
    const [campaign, setCampaign] = useState<any>();
    const [cantidad, setCantidad] = useState("0");
    const [member, setMember] = useState<IMember>();
    const [isManager, setIsManager] = useState(false);
    const [selectedDonations, setSelectedDonations] = useState(true);
    const [message, setMessage] = useState("Procesando transacción...");
    const [finished, setFinished] = useState(false);
    const [open, setOpen] = useState(false);
    const [balance, setBalance] = useState("");
    const [description, setDescription] = useState("");
    const [recipient, setRecipient] = useState("");
    const [cantidadTransact, setCantidadTransact] = useState("0.0");
    const [error, setError] = useState(false)
    useEffect(() => {
        async function fetchData() {
            const deployedCampaigns: string[] = await factory.methods
                .getDeployedCampaigns()
                .call();

            if (address && deployedCampaigns.includes(address)) {
                const accounts = await web3.eth.getAccounts();
                const instance = new web3.eth.Contract(Campaign.abi, address);
                const members = await instance.methods.getMemberList().call();
                const manager = await instance.methods.manager().call();
                const transact: ITransaction[] = await instance.methods.getTransactions().call();

                const memberInstance: IMember = await instance.methods
                    .members(accounts[0])
                    .call();
                setIsManager(manager === accounts[0]);
                setMember(memberInstance);
            
                let transactions: ITransaction[] = [];
                for (let i = 0; i < 10 && i < transact.length ; i++) {
                    transactions.push(transact[i]);
                }

                let donators: IMember[] = [];
                for (let i = 0; i < 10 && i < members.length; i++) {
                    let member: IMember = await instance.methods
                        .members(members[i])
                        .call();
                    let donations: IDonation[] = await instance.methods
                        .getDonations(members[i])
                        .call();
                    member.address = members[i];
                    member.donations = donations;
                    donators.push(member);
                }

                let campaign: ICampaign = {
                    title: await instance.methods.title().call(),
                    description: await instance.methods.description().call(),
                    minimum: (
                        await instance.methods.minimumContribution().call()
                    ).toString(),
                    address: address,
                    transactions: transactions,
                    members: donators,
                };
                
                setBalance(web3.utils.fromWei(await instance.methods.balance().call(), "ether"));
                setCampaignData(campaign);
                setCantidad(
                    web3.utils.fromWei(campaign.minimum.toString(), "ether")
                );
                setCampaign(instance);
            } else {
                navigate("/");
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSelectDonation = (select: boolean) => {
        setSelectedDonations(select);
    };

    const handleNewDonator = async () => {
        try {
            setOpen(true)
            const accounts = await web3.eth.getAccounts();
            if (member?.exists) {
                await campaign.methods.addDonation(comentario === "" ? "Sin comentario" : comentario).send({
                    from: accounts[0],
                    value: web3.utils.toWei(cantidad),
                });
            } else {
                await campaign.methods
                    .newDonatorContribution(nombre === ""? "Anon" : nombre, comentario === "" ? "Sin comentario" : comentario)
                    .send({
                        from: accounts[0],
                        value: web3.utils.toWei(cantidad),
                    });
            }
            setFinished(true)
            setMessage("La donación se ha realizado con éxito")
        } catch (e) {
            setError(true)
        }
    };

    const handleMakeTransaction = async () => {
        setOpen(true)
        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods
                .makeTransaction(
                    description,
                    web3.utils.toWei(cantidadTransact),
                    recipient
                )
                .send({
                    from: accounts[0],
                });
                setFinished(true)
                setMessage("La transacci se ha realizado con éxito")
        }
        catch(e){
            setError(true)
        }
    };

    const handleNombre = (titulo: string) => {
        setNombre(titulo);
    };

    const handleComentario = (descripcion: string) => {
        setComentario(descripcion);
    };

    const handleCantidad = (cantidad: string) => {
        if (cantidad.match(/^\d+(\.\d+)?$/)) {
            setCantidad(cantidad);
        }
    };

    const handleRecipient = (reci: string) => {
        setRecipient(reci);
    };

    const handleDescription = (desc: string) => {
        setDescription(desc);
    };

    const handleCantidadTransact = (cantidad: string) => {
        if (cantidad.match(/^\d+(\.\d+)?$/)) {
            setCantidadTransact(cantidad);
        }
    };

    return (
        <>
            <MainTemplate>
                <DetailsCampaignTemplate
                    campaignData={campaignData as ICampaign}
                    nombre={nombre}
                    comentario={comentario}
                    cantidad={cantidad}
                    isManager={isManager}
                    member={member}
                    description={description}
                    recipient={recipient}
                    cantidadTransact={cantidadTransact}
                    selectedDonations={selectedDonations}
                    message={message}
                    finished={finished}
                    open={open}
                    balance={balance}
                    error={error}
                    handleComentario={handleComentario}
                    handleNombre={handleNombre}
                    handleTransaction={handleNewDonator}
                    handleCantidad={handleCantidad}
                    handleSelectDonation={handleSelectDonation}
                    handleCantidadTransact={handleCantidadTransact}
                    handleDescription={handleDescription}
                    handleRecipient={handleRecipient}
                    handleMakeTransaction={handleMakeTransaction}
                ></DetailsCampaignTemplate>
            </MainTemplate>
        </>
    );
};

export default DetailsCampaign;
