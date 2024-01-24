export function HandleCnpj(text: HTMLInputElement) {
  let cnpj = text.value.replace(/[^\d./-]/g, "");
  switch (cnpj.length) {
    case 2:
    case 6:
      cnpj += ".";
      break;
    case 10:
      cnpj += "/";
      break;
    case 15:
      cnpj += "-";
      break;
  }
  return cnpj;
}
