import './App.css'
import { useState, useEffect } from 'react'

function App() {

	const [requestCount, setRequestCount] = useState<number>(0)
	const [coordinates, setCoordinates] = useState<null|GeolocationCoordinates>(null)
	const [error, setError] = useState<null|GeolocationPositionError>(null)

	useEffect(() => {

		if (!navigator.geolocation) {
			return
		}

		let watchId = 0

		const successCallback = ({ coords }: GeolocationPosition) => {

			setRequestCount(c => c + 1)
			setCoordinates(coords)
		}

		const errorCallback = (error: GeolocationPositionError) => setError(error)

		watchId = navigator.geolocation.watchPosition(successCallback, errorCallback, {
			enableHighAccuracy: true,
			timeout: 1000,
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
			<h1>navigator.geolocation.watchPosition debug</h1> 
			<p>accuracy: {coordinates.accuracy || 'NULL'}</p>
			<p>altitude: {coordinates.altitude || 'NULL'}</p>
			<p>altitudeAccuracy: {coordinates.altitudeAccuracy || 'NULL'}</p>
			<p>heading: {coordinates.heading || 'NULL'}</p>
			<p>latitude: {coordinates.latitude || 'NULL'}</p>
			<p>longitude: {coordinates.longitude || 'NULL'}</p>
			<p>speed: {coordinates.speed || 'NULL'}</p>
			<p>request count: {requestCount}</p>

			{coordinates.speed && (
				<h1>{coordinates.speed * 3.600000}km/h</h1>
			)}
		</>
	)
}

export default App
