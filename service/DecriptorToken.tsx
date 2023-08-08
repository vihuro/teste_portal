export default function TokenDrecriptor(token: string) {
    if (token) {
        const tokenDecriptor = JSON.parse(Buffer.from(token.split('.')[1], "base64").toString());

        return tokenDecriptor;

    }
}