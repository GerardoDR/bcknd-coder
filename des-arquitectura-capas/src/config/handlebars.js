const hbsConfig =
{
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: "src/views/layouts",
    partialsDir: "src/views/partials/",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    }
}
module.exports = {hbsConfig};