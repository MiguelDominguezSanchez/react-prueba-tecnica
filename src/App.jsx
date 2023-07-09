import { useEffect, useState } from 'react'
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function App() {
	const [fact, setFact] = useState()
	const [imageUrl, setImageUrl] = useState()

	// Es buena práctica que los efectos en React solo tengan una responsabilidad, no tengáis efectos que tiene muchas responsabilidades, por que son muy difíciles de depurar.

	// Para recuperar la cita al cagar la página
	useEffect(() => {
		fetch(CAT_ENDPOINT_RANDOM_FACT)
			.then((res) => res.json())
			.then((data) => {
				const { fact } = data
				setFact(fact)
			})
	}, [])

	// Para recuperar la imagen cada vez que tenemos una cita nueva
	useEffect(() => {
		if (!fact) return
		const threeFirstWord = fact.split(' ', 3).join(' ')
		console.log(threeFirstWord)

		fetch(
			`https://cataas.com/cat/says/${threeFirstWord}?size=50&color=red&json=true`
		)
			.then((res) => res.json())
			.then((response) => {
				const { url } = response
				setImageUrl(`https://cataas.com${url}`)
			})
	}, [fact])

	return (
		<main>
			<h1>App de gatitos</h1>
			{fact && <p>{fact}</p>}
			{imageUrl && (
				<img
					src={imageUrl}
					alt={`Image extracted using the first three words for ${fact}`}
				/>
			)}
		</main>
	)
}
