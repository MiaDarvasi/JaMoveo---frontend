import watermark from "../assets/imgs/watermark.png"

export function AppFooter() {

	return (
		<footer className="app-footer full">
			<a href="https://miadarvasi.netlify.app/" target="blank">
				<div className="watermark"><img src={watermark} />Made by Mia</div>
			</a>
		</footer>
	)
}