import { FC } from "react"

interface IProps{
    campaigns: []
}

const MisProyectosTemplate: FC<IProps> = ({campaigns}) => {
    return (
        <>
            {campaigns}
        </>
    )
}
export default MisProyectosTemplate