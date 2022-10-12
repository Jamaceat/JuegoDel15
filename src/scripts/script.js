const tabla = document.querySelector("#tablero")
const botones = tabla.querySelectorAll("button")

const encontrarVacio = () => {
	// Retorna la posicion en el arreglo del elemento vacio
	return Array.from(botones)
		.map((x, i) => (x.value === "15" ? i : 0))
		.filter((x) => x > 0)[0]
}

// Retorna 1 si esta en la misma fila, 2 si esta en la misma columna y 3 si no esta en ninguna de estas
const orientacion = (boton) => {
	// Capturar boton vacio
	let orientar
	const vacio = botones[encontrarVacio()]
	boton.value
}

const mover = (boton) => {}

botones[3].addEventListener("click", (e) => {
	console.log(encontrarVacio())
})
