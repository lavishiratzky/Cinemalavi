import './About.css';
import cinema from '../../../../src/Assets/Images/cinema.jpg';

function About(): JSX.Element {
  return (
    <div className="About">
      <h1>About the App.</h1>
      <p>This App. will allow the customer to order tickets for a movie from the movies available.</p>
      <p>The user will be able to do so only after he is logged in with is email and password.</p>
      <p>
        After the order has been sent to the Orders database, the user will be passed to a "Success" page, where his
        order details will be displayed.
      </p>
      <p>
        From the Administrator endpoint, After logging in with an email and a password, the admin will be able to Add,
        Edit or Delete a movie from the movie list.
      </p>
      <p>In addition, the admin. will be able to look at the Up to date OrderList.</p>
      <div className="image-container">
        <div>
          <h3>Directions:</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3366.1959492229457!2d34.954149!3d32.467450299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d0e093e9688e7%3A0x118499b6c7effd02!2z15LXmdeg16og15DXkteV15YgMTAsINek16jXk9ehINeX16DXlCDXm9eo15vXldeo!5e0!3m2!1siw!2sil!4v1681070574891!5m2!1siw!2sil"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div>
          <h3>Inside Look:</h3>
          <img src={cinema} alt="image not found" />
        </div>
      </div>
      <p>
        The cinema is open from Monday to Sunday, providing entertainment and movie screenings throughout the week. Our
        opening hours are as follows:
      </p>
      <p>
        Monday: 9:00 AM - 10:00 PM<br />
        Tuesday: 9:00 AM - 10:00 PM<br />
        Wednesday: 9:00 AM - 10:00 PM<br />
        Thursday: 9:00 AM - 10:00 PM<br />
        Friday: 9:00 AM - 15:00 AM (Midnight)<br />
        Saturday: 9:00 AM - 12:00 AM (Midnight)<br />
        Sunday: 10:00 AM - 10:00 PM
      </p>
    </div>
  );
}

export default About;
