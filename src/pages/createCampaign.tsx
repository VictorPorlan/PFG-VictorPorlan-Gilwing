import { FC, useState } from "react";
import { useNavigate } from "react-router";
import CrearTemplate from "../components/templates/crearTemplate";
import MainTemplate from "../components/templates/mainTemplate";
import factory from "../utils/factory";
import web3 from "../utils/web3";

const CreateCampaign: FC = () => {
    const [titulo, setTitulo] = useState<string>("");
    const [descripcion, setDescripcion] = useState<string>("");
    const [minimo, setMinimo] = useState<number>(0);

    const navigate = useNavigate()

    const [message, setMessage] = useState("Procesando transacción...");
    const [finished, setFinished] = useState(false);
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState("")

    const handleOnPressDialog = () => {
      navigate(`/campaigns/${address}`)
    };

    const handleCreate = async () => {
        setOpen(true)
        const accounts = await web3.eth.getAccounts();
        const response = await factory.methods
            .createCampaign(minimo, titulo, descripcion)
            .send({ from: accounts[0] });

        setAddress(response.events.DeployedAt.returnValues.loc)


        setFinished(true)
        setMessage("Se ha creado la campaña con éxito")
    };

    const handleTitulo = (titulo: string) => {
        setTitulo(titulo);
    };

    const handleDescripcion = (descripcion: string) => {
        setDescripcion(descripcion);
    };

    const handleMinimo = (minimo: number) => {
        setMinimo(minimo);
    };

    return (
        <>
            <MainTemplate>
                <CrearTemplate
                    titulo={titulo}
                    descripcion={descripcion}
                    minimo={minimo}
                    message={message}
                    finished={finished}
                    open={open}
                    handleOnPressDialog={handleOnPressDialog}
                    handleTitulo={handleTitulo}
                    handleDescripcion={handleDescripcion}
                    handleMinimo={handleMinimo}
                    handleCreate={handleCreate}
                ></CrearTemplate>
            </MainTemplate>
        </>
    );
};

export default CreateCampaign;
