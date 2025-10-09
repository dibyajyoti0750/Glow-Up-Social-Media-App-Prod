import "dotenv/config";
import Imagekit from "imagekit";

const imagekit = new Imagekit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  publicKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export default imagekit;
