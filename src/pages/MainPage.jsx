import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { songService } from "../services/song/song.services"
import { useNavigate } from "react-router"
import { SongImgCarusel } from "../cmps/songImgCarusel"

export function MainPage() {

	const [searchTerm, setSearchTerm] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()

	useEffect(() => {
		if (!user?.isAdmin) {
			socketService.on('start-live-session', (song) => {
				navigate('/live', { state: { song } })
			})
		}

		return () => {
			socketService.off('start-live-session')
		}
	}, [navigate, user])


	function handleChange(ev) {
		setSearchTerm(ev.target.value)
	}

	async function onSearch() {
		if (!searchTerm.trim()) return
		setIsLoading(true)
		const results = await songService.query({ name: searchTerm, artist: searchTerm })
		setIsLoading(false)
		navigate("/search-results", { state: { results } })
	}

	if (!user) return null

	return (
		<section className="main-page">
			<section className="top-main-page">
				{!user.isAdmin ? (
					<section>
						<h1>Waiting for next song...</h1>
						<a href="https://www.youtube.com" target="_blank">Go practice using YouTube <span className='arrow'>&#8594;</span></a>
					</section>
				) : (
					<section className="admin-search">
						<h1>Search any song!</h1>
						<input
							type="text"
							value={searchTerm}
							onChange={handleChange}
							onKeyDown={(ev) => {
								if (ev.key === 'Enter') onSearch()
							}}
							placeholder="Search by song or artist"
						/>
						<button onClick={onSearch} disabled={isLoading}>
							{isLoading ? "Searching..." : "Search"}
						</button>
					</section>
				)}
				<section>
					<img src="https://cdn.dribbble.com/userupload/4768581/file/original-1ac26a8d62c9dd6058419ed55ae411d6.png?resize=2048x1536&vertical=center" />
					<div className="img-credit">
						<p>This image was created by <a href="https://dribbble.com/qoyyumarfi" target="blank">Qoyyum Arfi</a> for <a href="https://dribbble.com/vektora" target="blank">Vectora</a></p>
						<p>Image sourced from <a href="https://dribbble.com/" target="blank">Dribbble</a></p>
					</div>
				</section>
			</section>

			<SongImgCarusel />
		</section>
	)
}
