import { useSelector } from "react-redux"
import { useState } from "react"
import { query } from "../services/song/song.services"
import { useNavigate } from "react-router"
import { SongImgCarusel } from "../cmps/songImgCarusel"


export function MainPage() {
	const user = useSelector(storeState => storeState.userModule.user)
	const [searchTerm, setSearchTerm] = useState('')
	const navigate = useNavigate()

	function handleChange(ev) {
		setSearchTerm(ev.target.value)
	}

	function onSearch() {
		const filteredSongs = query({ name: searchTerm, artist: searchTerm })
		navigate("/search-results", { state: { results: filteredSongs } })
	}

	if (!user) return null

	return (
		<section className="main-page">
			<section className="top-main-page">
				{!user.isAdmin && (
					<>
						<section>
							<h1>Waiting for next song...</h1>
							<a href="https://www.youtube.com" target="_blank">Go practice using YouTube <span className='arrow'>&#8594;</span></a>
						</section>
					</>
				)}

				{user.isAdmin && (
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
						<button onClick={onSearch}>Search</button>
					</section>
				)}
				<img src="https://cdn.dribbble.com/userupload/4768581/file/original-1ac26a8d62c9dd6058419ed55ae411d6.png?resize=2048x1536&vertical=center" />
			</section>

			<SongImgCarusel />
		</section>
	)
}
