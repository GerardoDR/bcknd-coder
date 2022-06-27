import faker from "faker";
import { writeFile } from "fs";
faker.locale = "es";
const { name, internet, random } = faker;

let str = "NOMBRE;APELLIDO;EMAIL;TRABAJO;LUGAR\n";

class People {
  static generate(cant) {
    for (let i = 0; i < cant; i++) {
      str +=
        name.firstName() +
        ";" +
        name.lastName() +
        ";" +
        internet.email() +
        ";" +
        name.jobTitle() +
        ";" +
        random.locale() +
        "\n";
    }
    writeFile("./test.csv", str, (err) => {
      if (err) console.log(err);
      console.log("archivo guardado");
    });
  }
}

export { People };
