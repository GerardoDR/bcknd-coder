const { normalize, denormalize, schema } = require("normalizr");
const util = require("util");
const print = (obj) => {
  console.log(util.inspect(obj, false, 12, true))
}
const save = (obj) => {
  fs.writeFileSync("normalizd.json", JSON.stringify(obj, null, 2) );
}

const fs = require("fs");

const author = new schema.Entity("author");

const mensaje = new schema.Entity("mensaje", {
  author,
});

const mensajesSch = new schema.Entity("mensajes",{
  mensajes: [mensaje],
});

const originalData = JSON.parse(fs.readFileSync("messages.json"));


const normalized = normalize(originalData, mensajesSch);

print(normalized)
save(normalized)

// let normalizedLength = JSON.stringify(normalized).length
// console.log(normalizedLength);

console.log("\n---------------------------------\n---------------------------------\n");
const denormalized = denormalize(normalized.result, mensajesSch, normalized.entities);
print(denormalized);
// let denormalizedLength = JSON.stringify(denormalized).length
// console.log(denormalizedLength);

// console.log("\n---------------------------------\n---------------------------------\n");

// let compressedPercent = normalizedLength / (denormalizedLength / 100)
// console.log("Porcentaje luego de normalización: "+compressedPercent+"%");