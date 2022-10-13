const tabla = document.querySelector("#tablero")
const botones = tabla.querySelectorAll("button")

const encontrar = (valor) => {
	// Retorna la posicion en el arreglo del elemento vacio

	return (
		Array.from(botones)
			.map((x, i) => (String(x.textContent).trim() === `${valor}` ? i : 0))
			.filter((x) => x > 0)[0] || 0
	)
}

// Retorna 1 si esta en la misma fila, 2 si esta en la misma columna y 3 si no esta en ninguna de estas
const orientacion = (boton) => {
	const vacio = botones[encontrar(16)]

	console.log("es vacio", vacio)
	console.log("boton valor", boton.value, " vacio valor", vacio.value)
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
	const vacio = botones[encontrar(16)]
	// const orientacion = orientacion
	const dist =
		orientacion === 1
			? Math.floor(Number(vacio.value) - Number(boton.value))
			: Math.floor((Number(vacio.value) - Number(boton.value)) / 4)
	return dist
}

// Consigue la lista de las casillas para moverlas
const rango = (boton, orientacion, distancia) => {
	let casillas = [boton]
	const adelante = distancia > 0
	console.log(
		boton,
		"orientacion ",
		orientacion,
		"distancia ",
		distancia,
		"adelante ",
		adelante
	)
	for (let i = 1; i <= Math.abs(distancia); i++) {
		if (orientacion === 1) {
			adelante
				? casillas.push(
						botones[encontrar(Number(boton.textContent.trim())) + i]
				  )
				: casillas.push(
						botones[encontrar(Number(boton.textContent.trim())) - i]
				  )
			console.log(
				encontrar(Number(boton.textContent.trim())) + i,
				"a veeeeer",
				"distancia: ",
				distancia
			)
		} else if (orientacion === 2) {
			adelante
				? casillas.push(
						botones[encontrar(Number(boton.textContent.trim())) + 4 * i]
				  )
				: casillas.push(
						botones[encontrar(Number(boton.textContent.trim())) - 4 * i]
				  )
		}
	}

	return casillas
}

const mover = (lista) => {
	let cambio = lista

	console.log(cambio)
	cambio[cambio.length - 1].style.visibility = "visible"
	for (let i = cambio.length - 1; i > 0; i--) {
		let auxiliar = String(cambio[i].value)
		let auxiliar2 = cambio[i].textContent.trim()
		cambio[i].value = String(cambio[i - 1].value)
		cambio[i].textContent = String(Number(cambio[i - 1].textContent.trim()))
		console.log("cambio el valor? ", cambio[i].value, "ademaaaas", cambio[i])
		cambio[i - 1].value = auxiliar
		cambio[i - 1].textContent = String(Number(auxiliar2))
	}

	cambio[0].style.visibility = "hidden"
	ajustar()
}

const ajustar = () => {
	Array.from(botones).forEach((x, i) => {
		x.value = i
	})
}

Array.from(botones).map((x, i) => {
	x.addEventListener("click", () => {
		const orient = orientacion(x)

		console.log("boton,", x.value)
		if (orient != 3) {
			console.log(orient)
			const dist = distancia(x, orient)
			console.log(dist)
			const casillas = rango(x, orient, dist)
			mover(casillas)
		}
	})
})
