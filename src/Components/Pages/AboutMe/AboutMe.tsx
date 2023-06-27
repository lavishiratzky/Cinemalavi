import './AboutMe.css';
import Me from '../../../../src/Assets/Images/Me.jpg';
import SocialMedia from '../../Layout/SocialMedia/SocialMedia';

function AboutMe(): JSX.Element {
  return (
    <div className="AboutMe">
      <div className="container">
        <div className="text">
          <h1>Lavi Shiratzky</h1>
          <h3>I'm 42 years old, I live in Pardess-Hanna, married to Shirley, and we have 2 children.</h3>
          <h5>
            After 10 years as a Physio at "Clalit," I decided to switch to the Technologic world. So I entered a Career
            retraining course through "Clalit" at "John Bryce Education," where we learned Programming.
          </h5>
          <ol>
            <h5>My Technological stack:</h5>
            <li>FrontEnd: React TS</li>
            <li>BackEnd: C# & SQL</li>
          </ol>
        </div>
        <div className="image">
          <img src={Me} alt="image not found" />
        </div>
        <div className="social-media">
          <SocialMedia />
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
