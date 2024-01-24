export type CustomErrorProps = {
  message: string;
};
export enum ETypeErro {
  CUSTOM_ERROR,
}
export function CustomError({ message }: CustomErrorProps): Error {
  return {
    message: message,
    name:"",
    cause: ETypeErro.CUSTOM_ERROR,
  };
}
