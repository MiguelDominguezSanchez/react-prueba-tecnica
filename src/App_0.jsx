import { useState, useEffect } from 'react'

const CAT_ENDPOINT_RANDOM_FACT = `https://catfact.ninja/fact `
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says${firstWord}/hello?size=50&color=red&json=true`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function App() {
	const [fact, setFact] = useState()
	// const [imageUrl, setImageUrl] = useState()

	// No podemos hacer fetching datos por que cada vez que renderizamos el componente.  Al cambiar el estado, haríamos un  loop infinito, no estamos controlando el flujo de estado de la app. PROHIBIDO.
	// fetch('https://catfact.ninja/fact')
	// 	.then((response) => response.json())
	// 	.then((data) => setFact(data.fact))

	// No puedes instalar dependencias que te faciliten el renderizado. Axios, Apollo. React Query.
	// Entendimiento básico. Construir sobre la base.
	useEffect(() => {
		fetch(CAT_ENDPOINT_RANDOM_FACT)
			.then((res) => res.json())
			.then((data) => {
				const { fact } = data
				setFact(fact)

				const firstWord = fact.split(' ', 3)
				console.log(firstWord)
			}

		fetch(
			`https://cataas.com/cat/says${firstWord}/hello?size=50&color=red&json=true`
		)
			.then((res) => res.json())
			.then((response) => {
				const { url } = response
			})
	}, []) // efecto solo se ejecuta la primera vez que se renderiza nuestro componente.

	// Al escribir el useEffect por primera vez, primero escribir el array vacío (dependencias) y luego la función.
	// useEffect(() => {},[])

	return (
		<main>
			<h1>App de gatitos</h1>
			{fact && <p>{fact}</p>}
			{imageUrl && (
				<img
					src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`}
					alt={`Imagge extracted using the first three words for ${fact}`}
				/>
			)}
		</main>
	)
}
