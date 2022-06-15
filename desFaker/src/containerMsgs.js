const fs = require("fs");
const { normalize, denormalize } = require("normalizr");
const { mensajesSch } = require("./data/normalizrSchemas");

class ContainerMsgs {
  constructor(fileName) {
    (this.fileName = fileName), (this.normzed = null);
  }

  getAll() {
    try {
      let data = fs.readFileSync(this.fileName, "utf-8");
      data = JSON.parse(data);
      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  save(obj) {
    try {
    let data = this.getAll();

    if (data) {
      data = denormalize(data.result, mensajesSch, data.entities);
      data.mensajes.push(obj);
      data = normalize(data, mensajesSch);
    } else {
      let newFile = {
        id: "mensajes",
        mensajes: [{ ...obj }],
      };
      data = normalize(newFile, mensajesSch);
    }

    let dataSTR = JSON.stringify(data, null, 2);
    fs.writeFileSync(this.fileName, dataSTR);
    }
      catch (error) {
        console.log(error);
    }
  }
}
module.exports = ContainerMsgs;
