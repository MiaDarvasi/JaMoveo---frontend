import { useLocation, useNavigate } from 'react-router-dom'
import heyJudeData from '../data/hey_jude.json'
import { useSelector } from 'react-redux'
import { socketService, SOCKET_EVENT_END_LIVE } from '../services/socket.service'
import { useEffect, useState } from 'react'

export function LivePage() {
    const navigate = useNavigate()
    const location = useLocation()
    const song = location.state?.song
    const user = useSelector(storeState => storeState.userModule.user)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    useEffect(() => {
        const onEndSession = () => {
            navigate('/main')
        }

        socketService.on(SOCKET_EVENT_END_LIVE, onEndSession)

        let scrollIntervalId

        if (isAutoScroll) {
            const scrollStep = 1
            const scrollDelay = 50

            scrollIntervalId = setInterval(() => {
                window.scrollBy(0, scrollStep)
                const atBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight
                if (atBottom) clearInterval(scrollIntervalId)
            }, scrollDelay)
        }

        return () => {
            socketService.off(SOCKET_EVENT_END_LIVE, onEndSession)
            if (scrollIntervalId) clearInterval(scrollIntervalId)
        }
    }, [navigate, isAutoScroll])


    if (!song) return <p>No song selected.</p>
    if (!user) return <div>Loading...</div>;

    const hasLyricsData = Array.isArray(song.lyrics) && song.lyrics.length > 0
    const lyricsData = hasLyricsData ? song.lyrics : heyJudeData

    function handleEndSession() {
        navigate('/main')
        socketService.emit(SOCKET_EVENT_END_LIVE)
    }

    return (
        <section className="live-page">

            {hasLyricsData && (
                <>
                    <h1>Now Playing</h1>
                    <h2>{song.name}</h2>
                    <h3>by {song.artist}</h3>
                </>
            )}

            {!hasLyricsData && (
                <div className="fallback-msg">
                    <p>Lyrics and chords for this song haven't been added yet. <br />
                        <span>Try this song instead!</span></p>
                    <h1>Now Playing</h1>
                    <h2>Hey Jude</h2>
                    <h3>by The Beatles</h3>
                </div>
            )}

            {user.isAdmin && (
                <button onClick={handleEndSession}>End Session</button>
            )}
            
            <section className="lyrics-chords">
                {user.instrument !== 'singer' && lyricsData.map((line, idx) => (
                    <p key={idx}>
                        {line.map((word, i) => (
                            <span key={i}>
                                {word.chords ? <strong>{word.chords}</strong> : ''} {word.lyrics}
                            </span>
                        ))}
                    </p>
                ))}
                {user.instrument === 'singer' && lyricsData.map((line, idx) => (
                    <p key={idx}>
                        {line.map((word, i) => (
                            <span key={i}> {word.lyrics} </span>
                        ))}
                    </p>
                ))}
            </section>

            <button className="scroll-toggle-btn" onClick={() => setIsAutoScroll(prev => !prev)}>
                {isAutoScroll ? 'Stop Auto-Scroll' : 'Start Auto-Scroll'}
            </button>
        </section>
    )
}
