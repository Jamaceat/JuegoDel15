const tabla = document.querySelector("#tablero")
const botones = tabla.querySelectorAll("button")
const play = document.querySelector("#play")

function shuffle(array) {
	let currentIndex = array.length
	let randomIndex
	// While there remain elements to shuffle.
	while (currentIndex != 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--

		// And swap it with the current element.
		;[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		]
	}

	return array
}

const ganador = () => {
	terminado = Array.from(botones)
		.map((x) => Number(x.textContent.trim()))
		.filter((x, i) => x === i + 1)

	console.log(terminado)
	resultado = terminado.length === 16 ? true : false
	resultado ? console.log("GANADOR") : ""
}

play.addEventListener("click", () => {
	botones[botones.length - 1].style.visibility = "visible"

	let orden = shuffle(
		Array(16)
			.fill(0)
			.map((x, i) => i)
	)

	Array.from(botones).forEach((x, i) => {
		x.style.visibility = "visible"
		x.value = orden[i]
		x.textContent = Number(x.value) + 1
		if (orden[i] === 15) {
			x.style.visibility = "hidden"
		}
	})
	ajustar()

	if (play.textContent !== "Restart") {
		play.textContent = "Restart"
	}
})

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

	for (let i = 1; i <= Math.abs(distancia); i++) {
		if (orientacion === 1) {
			adelante
				? casillas.push(
						botones[encontrar(Number(boton.textContent.trim())) + i]
				  )
				: casillas.push(
						botones[encontrar(Number(boton.textContent.trim())) - i]
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

	cambio[cambio.length - 1].style.visibility = "visible"
	for (let i = cambio.length - 1; i > 0; i--) {
		let auxiliar = String(cambio[i].value)
		let auxiliar2 = cambio[i].textContent.trim()
		cambio[i].value = String(cambio[i - 1].value)
		cambio[i].textContent = String(Number(cambio[i - 1].textContent.trim()))
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

		if (orient != 3) {
			const dist = distancia(x, orient)
			const casillas = rango(x, orient, dist)
			mover(casillas)
		}

		ganador()
	})
})
