

export const handleNumericDecimal = (text: string) => {

    const removedPointsToText = text.replaceAll(".", "").replace(",", ".");

    const converterStringInDooble = parseFloat(removedPointsToText);

    const stringInput = converterStringInDooble.toLocaleString("pt-Br", {
        style: "decimal",
        maximumFractionDigits: 2
    })

    const quantityCharacteresInText = text.length;
    const lastCharacter = text.charAt(quantityCharacteresInText - 1);

    const stringForInput = lastCharacter === "," ? stringInput + "," : stringInput;

    if (Number.isNaN(converterStringInDooble)) {
        return "";
    }

    return stringForInput

}