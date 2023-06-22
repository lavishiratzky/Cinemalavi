import "./About.css";

function About(): JSX.Element {
    return (
        <div className="About">
		<h1>About the App.</h1>	
        <p>This App. will allow the customer to order tickets for a movie from the movies available. </p>
        <p>The user will be able to do so only after he is logged in with is email and password. </p>
        <p>After the order has been sent to the Orders database, the user will be passed to a "Success" page , where his order details will be displayed.  </p>
        <p>From the Administrator endpoint, After logging with an emil and a password, he will be able to Add, Edit or Delete a movie from the movie list. </p>
        <p>In addition, the admin. will be able to look at the  Up to date OrderList. </p>
        </div>
    );
}

export default About;
