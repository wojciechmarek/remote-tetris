import { v4 as uuidv4 } from "uuid";

export const QrCodeUtils = () => {
  const url = import.meta.env.VITE_CONTROLLER_URL;

  const generateNewId = () => {
    const id = uuidv4() as string;
    return id;
  };

  const generateNewQrCodeValueBasedOnId = (id: string) => {
    const qrCodeLink = `${url}/${id}`;
    return qrCodeLink;
  };

  return {
    generateNewId,
    generateNewQrCodeValueBasedOnId
  };
};
