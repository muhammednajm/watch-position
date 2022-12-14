import './App.css'
import { useState, useEffect } from 'react'

function App() {

	const [coordinates, setCoordinates] = useState<null|GeolocationCoordinates>(null)
	const [error, setError] = useState<null|GeolocationPositionError>(null)

	useEffect(() => {

		if (!navigator.geolocation) {
			return
		}

		let watchId = 0

		const successCallback = ({ coords }: GeolocationPosition) => {
			setCoordinates(coords)
		}

		const errorCallback = (error: GeolocationPositionError) => setError(error)

		watchId = navigator.geolocation.watchPosition(successCallback, errorCallback, {
			enableHighAccuracy: true,
			timeout: 250,
			maximumAge: 0,
		})

		return () => {

			navigator.geolocation.clearWatch(watchId)
		}

	}, [])

	if (error) {
		return (
			<pre>
				{JSON.stringify(error, null, 4)}
			</pre>
		)
	}

	if (coordinates === null) {
		return <>loading...</>
	}

	return (
		<>
			<h1>
				<span className="unit">km/h</span>
				<span className="value">{((coordinates.speed || 0) * 3.600000).toFixed(1)}</span>
			</h1>
			<h1>
				<span className="unit">m/m</span>
				<span className="value">{((coordinates.speed || 0) * 60).toFixed(1)}</span>
			</h1>
		</>
	)}

export default App
