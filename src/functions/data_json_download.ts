import { Destination, download } from "../../deps.ts";

const destination: Destination = {
  dir: "data",
  file: "data.json",
};
export default () => {
  const url = Deno.env.get("URL") ?? "";
  if (url === "") {
    throw new Error("Env URL is undefined.");
  }

  download(url, destination)
    .then((fileObj: { fullPath: string }) => {
      console.log(`データダウンロードに成功しました: ${fileObj.fullPath}`);
    })
    .catch((error: Error) => {
      console.error(error);
    });
};
