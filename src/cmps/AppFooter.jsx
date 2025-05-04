import watermark from "../assets/imgs/watermark.png"

export function AppFooter() {

	return (
		<footer className="app-footer full">            
            {import.meta.env.VITE_LOCAL ? 
                <span className="local-services">Local Services</span> : 
                <span className="remote-services">Remote Services</span>}
				<a href="https://miadarvasi.netlify.app/" target="blank"><div className="watermark"><img src={watermark}/>Made by Mia</div></a>
		</footer>
	)
}