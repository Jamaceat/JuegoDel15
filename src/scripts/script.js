const tabla = document.querySelector("#tablero")
const botones = tabla.querySelectorAll("button")

const encontrar = (valor) => {
	// Retorna la posicion en el arreglo del elemento vacio
	return Array.from(botones)
		.map((x, i) => (x.value === `${valor}` ? i : 0))
		.filter((x) => x > 0)[0]
}

// Retorna 1 si esta en la misma fila, 2 si esta en la misma columna y 3 si no esta en ninguna de estas
const orientacion = (boton) => {
	const vacio = botones[encontrar(15)]
	if (Number(boton.value) % 4 === Number(vacio.value) % 4) {
		return 2
	} else if (
		Math.floor(Number(boton.value) / 4) === Math.floor(Number(vacio.value) / 4)
	) {
		return 1
	}
	return 3
}
// Retorna que tan lejos esta la casilla del espacio
const distancia = (boton, orientacion) => {
	const vacio = botones[encontrar(15)]
	// const orientacion = orientacion
	const dist =
		orientacion === 1
			? Math.floor(Number(vacio.value) - Number(boton.value))
			: Math.floor(Number(vacio.value) - Number(boton.value)) / 4
	return dist
}

const rango = (boton, orientacion, distancia) => {
	let casillas = [boton]
	const adelante = distancia > 0
	for (let i = 1; i <= Math.abs(distancia); i++) {
		if (orientacion === 1) {
			adelante
				? casillas.push(botones[encontrar(Number(boton.value)) + i])
				: casillas.push(botones[encontrar(Number(boton.value)) - i])
		} else if (orientacion === 2) {
			adelante
				? casillas.push(botones[encontrar(Number(boton.value)) + 4 * i])
				: casillas.push(botones[encontrar(Number(boton.value)) - 4 * i])
		}
	}

	return casillas
}

const mover = (boton) => {}

Array.from(botones).map((x, i) =>
	x.addEventListener("click", () => {
		const orient = orientacion(x)
		if (orient != 3) {
			console.log(orient)
			const dist = distancia(x, orient)
			console.log(dist)
			console.log(rango(x, orient, dist))
		}
	})
)
