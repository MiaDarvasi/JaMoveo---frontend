import { useLocation, useNavigate } from 'react-router-dom'

export function ResultsPage() {
	const location = useLocation()
	const navigate = useNavigate()
	const results = location.state?.results || []

	function handleSelect(song) {
		navigate('/live', { state: { song } })
	}

	return (
		<section>
			<h1>Search Results</h1>
			{!results.length && <p>No results found.</p>}
			<ul>
				{results.map((song, idx) => (
					<li key={idx}>
						<strong>{song.name}</strong> by {song.artist}
						<button onClick={() => handleSelect(song)}>Select Song</button>
					</li>
				))}
			</ul>
		</section>
	)
}
