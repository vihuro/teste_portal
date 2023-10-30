import { parseCookies } from "nookies";
import TokenDrecriptor from "../../service/DecriptorToken";
import { tokenProps } from "./infoToken";

const tokenInfo: tokenProps = TokenDrecriptor(parseCookies().ACCESS_TOKEN);

export default { tokenInfo }
