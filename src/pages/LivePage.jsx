import { useLocation, useNavigate } from 'react-router-dom'

export function LivePage() {
    const location = useLocation()
    const navigate = useNavigate()
    const song = location.state?.song

    if (!song) return <p>No song selected.</p>

    function handleEndSession() {
        navigate('/main')
    }

    return (
        <section className="live-page">
            <h1>Now Playing</h1>
            <h2>{song.name}</h2>
            <p>by {song.artist}</p>
            <p>{song.lyrics}</p>
            <button onClick={handleEndSession}>End Session</button>
        </section>
    )
}
