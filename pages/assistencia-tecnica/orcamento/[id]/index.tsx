import { useRouter } from "next/router";
import { useEffect } from "react";
import Api from "../../../../service/api/assistenciaTecnica/Assistencia";
import InfoPage from "../../../../components/OrcamentoById/InfoForPageById";
import Menu from "../../../../components/menuBar/MenuBar";
import Body from "../../../../components/table/Body";


export default function OrcamentoById() {

    const { Page, setToogleValue, toogleValue } = Menu();

    const router = useRouter();
    const byId: string | undefined = router.query.id?.toString();

    // useEffect(() => {
    //     console.log(byId)
    //     if (byId) {
    //         Fetchdata();
    //     }

    // }, [byId])

    return (
        <div>
            <Page />
            <Body changeToogleAlterarSenha={setToogleValue} toogleCardAlterarSenha={toogleValue} >
                {byId && (
                    <InfoPage numeroOrcamento={parseInt(byId)} />
                )}
            </Body>

        </div>
    )
}