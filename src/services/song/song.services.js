export const songService = {
	query
}

export async function query(filterBy = { name: '', artist: '' }) {
	const term = encodeURIComponent(`${filterBy.name || ''} ${filterBy.artist || ''}`.trim())
	const url = `https://itunes.apple.com/search?term=${term}&entity=song&limit=25`

	try {
		const res = await fetch(url)
		const data = await res.json()
		return data.results.map(song => ({
			name: song.trackName,
			artist: song.artistName,
			previewUrl: song.previewUrl,
			artworkUrl: song.artworkUrl100
		}))
	} catch (err) {
		console.error('Failed to fetch songs:', err)
		return []
	}
}
