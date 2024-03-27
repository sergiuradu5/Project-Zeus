export const generateAvatarImgLink = (text?: string) => {
  const random = randomStringGenerator();
  return `https://api.multiavatar.com/${text || random}.png`;
};

export const randomStringGenerator = () => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < charactersLength) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};
