import { Link } from "react-router-dom";
    import "./SocialMedia.css";
    import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
    
    function SocialMedia(): JSX.Element {
        return (
            <div className="SocialMedia">
                <a href="https://www.linkedin.com/in/lavi-shiratzky/">
                <FaLinkedinIn size={36}/>
                </a>
                <a href="https://www.facebook.com/abamumin?mibextid=ZbWKwL">
            <FaFacebook size={36}/>
            </a>
        </div>
    );
}

export default SocialMedia;
