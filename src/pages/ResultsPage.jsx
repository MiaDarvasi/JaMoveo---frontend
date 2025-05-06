import { useLocation, useNavigate } from 'react-router-dom'
import { socketService } from '../services/socket.service'

export function ResultsPage() {
	const location = useLocation()
	const navigate = useNavigate()
	const results = location.state?.results || []

	function handleSelect(song) {
		socketService.emit('admin-select-song', song)
		navigate('/live', { state: { song } })
	}

	return (
		<section className="results-page">
			<h1>Search Results</h1>
			{!results.length && <p>No results found.</p>}
			<ul>
				{results.map((song, idx) => (
					<li key={idx}>
						<img src={song.artworkUrl} alt={song.name} width="50" />
						<p><span>{song.name}</span> by {song.artist}</p>
						<section>
							{song.previewUrl && (
								<a href={song.previewUrl} target="_blank" rel="noopener noreferrer">
									Preview Track
								</a>
							)}
							<button onClick={() => handleSelect(song)}>
								Select Song
							</button>
						</section>
					</li>
				))}
			</ul>
		</section>
	)
}
