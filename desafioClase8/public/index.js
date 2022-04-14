const PUTprod = document.querySelector('#PUTprod')
const PUTid = document.querySelector("#PUTid")


PUTid.addEventListener("change", (e => {
    PUTprod.action='/api/productos/' + e.target.value;
}))