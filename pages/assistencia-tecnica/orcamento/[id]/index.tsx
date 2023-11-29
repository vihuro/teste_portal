import { useRouter } from "next/router";
import { useEffect } from "react";
import Api from "../../../../service/api/assistenciaTecnica/Assistencia";
import InfoPage from "../../../../components/OrcamentoById/InfoForPageById";
import { Menu, Actions } from "../../../../components/menuBar/MenuBar";
import Body from "../../../../components/table/Body";


export default function OrcamentoById() {


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
            <Menu />
            <Body changeToogleAlterarSenha={Actions().setToogleValue} toogleCardAlterarSenha={Actions().toogleValue} >
                {byId && (
                    <InfoPage numeroOrcamento={parseInt(byId)} />
                )}
            </Body>

        </div>
    )
}