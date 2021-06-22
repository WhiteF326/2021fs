import { fetchJSON } from "https://code4sabae.github.io/js/fetchJSON.js";

let fileLib = {};

window.onload = async function () {
  addEventListener("contextmenu", e => {
    e.preventDefault();
  });
  
  const FileData = await fetchJSON("api/stage/search", {name: "NewStage.json"});
  new Stage(FileData, "stage");
}