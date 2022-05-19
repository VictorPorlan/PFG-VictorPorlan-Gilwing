import { FC, useState } from "react"
import CrearTemplate from "../components/templates/crearTemplate"
import MainTemplate from "../components/templates/mainTemplate"

const CreateCampaign: FC = () => {
    const [titulo, setTitulo] = useState<string>("")
    const [descripcion, setDescripcion] = useState<string>("")
    const [minimo, setMinimo] = useState<number>(0)

    const handleTitulo = (titulo: string) => {
        setTitulo(titulo)
    }

    const handleDescripcion = (descripcion: string) => {
        setDescripcion(descripcion)
    }

    const handleMinimo = (minimo: number) => {
        setMinimo(minimo)
    }

    return (
        <>
        <MainTemplate > 
            <CrearTemplate
            titulo={titulo}
            descripcion={descripcion}
            minimo={minimo}
            handleTitulo={handleTitulo}
            handleDescripcion={handleDescripcion}
            handleMinimo={handleMinimo}
            ></CrearTemplate>
        </MainTemplate>
        </>
    )
}

export default CreateCampaign