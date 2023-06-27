import moment from "moment";
import SocialMedia from "../SocialMedia/SocialMedia";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer(): JSX.Element {
    const today = new Date();

    return (
        <div className="Footer">
			<h1>all rights reseved to <Link to="/aboutme">Lavi Shiratzky</Link>  {moment(today).format('YYYY')}</h1>
            <SocialMedia/>
        </div>
    );
}

export default Footer;
