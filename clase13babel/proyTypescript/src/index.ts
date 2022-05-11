function random(numero:number) :number { return Math.floor(Math.random()* numero)};

function color () :string { return `rgb(${random(255)},${random(255)},${random(255)})`};