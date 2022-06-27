const { normalize, denormalize, schema } = require("normalizr");
const util = require("util");
let { originalData } = require("./empresas.js");

const print = (obj) => console.log(util.inspect(obj, false, 12, true));

const personas = new schema.Entity("personas");

const empresa = new schema.Entity("empresa", {
    gerente: personas,
  encargado: personas,
  empleados: [personas]
});

const empresasSchema = new schema.Entity("empresas", {
  empresas: [empresa]
});

const normalized = normalize(originalData, empresasSchema);

print(normalized)

// let normalizedLength = JSON.stringify(normalized).length
// console.log(normalizedLength);

// console.log("\n---------------------------------\n---------------------------------\n");
// const denormalized = denormalize(normalized.result, empresasSchema, normalized.entities);
// let denormalizedLength = JSON.stringify(denormalized).length
// console.log(denormalizedLength);

// console.log("\n---------------------------------\n---------------------------------\n");

// let compressedPercent = normalizedLength / (denormalizedLength / 100)
// console.log("Porcentaje luego de normalización: "+compressedPercent+"%");

