const fs = require("fs");
const { normalize, denormalize } = require("normalizr");
const {mensajesSch} = require("./data/normalizrSchemas");

class ContainerMsgs {
  constructor(fileName) {
    this.fileName = fileName,
    this.normzed = null;
    this.flag = false;
  }

  getAll() {
    let content = [];
    try{
      let data = fs.readFileSync(this.fileName, "utf-8");
      content = JSON.parse(data);
      this.normzed = normalize(content, mensajesSch);
      return content;
    } catch {
      console.log("No se encuentra el archivo");
      return [];
    }
  }

  save(obj) {
    let msgs = this.getAll();
    msgs = denormalize(this.normzed.result, mensajesSch,this.normzed.entities);
    console.log(msgs)
    msgs.push(obj);
    msgs = normalize(msgs, mensajesSch);
    fs.writeFileSync(this.fileName, JSON.stringify(msgs, null, 2), "utf-8");
  }
}

// const normalized = normalize(msgs, mensajes);
// let normalizedLength = JSON.stringify(normalized).length
// console.log(normalizedLength);

// const denormalized = denormalize(normalized.result, mensajes, normalized.entities);
// let denormalizedLength = JSON.stringify(denormalized).length
// console.log(denormalizedLength);

// let compressedPercent = normalizedLength / (denormalizedLength / 100)
// console.log("Porcentaje luego de normalización: "+compressedPercent+"%");

module.exports = ContainerMsgs;
