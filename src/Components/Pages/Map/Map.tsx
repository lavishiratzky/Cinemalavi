import "./Map.css";

function Map(): JSX.Element {
    return (
       
        <div className="Map">
             <h1>Map and opening hours </h1>
			<iframe 
            src= "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3366.1959492229457!2d34.954149!3d32.467450299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d0e093e9688e7%3A0x118499b6c7effd02!2z15LXmdeg16og15DXkteV15YgMTAsINek16jXk9ehINeX16DXlCDXm9eo15vXldeo!5e0!3m2!1siw!2sil!4v1681070574891!5m2!1siw!2sil"
            width="400"
            height="270" 
            style={{border:0}} 
            allowFullScreen
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    );
}

export default Map;


   