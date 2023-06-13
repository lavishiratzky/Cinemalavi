abstract class Global{
}
class Development extends Global{
    public urls = {
        // https://raw.githubusercontent.com/Adiper84/moviesDB/main/moviesdb.txt
        // http://localhost:5035/api/movies
        movies: "http://localhost:5035/api/movies",
       orders: "https://raw.githubusercontent.com/nogaoren/ordersDB/main/ordersDB",
       users: 'http://localhost:5035/api/users'


    }
}
class Production extends Global{
    public urls ={
        // www.clalit-app.com/api/tasks
        // http://localhost:5035/api/movies
        movies: 'http://localhost:5035/api/movies',
        orders: "https://raw.githubusercontent.com/nogaoren/ordersDB/main/ordersDB",
        users: 'http://localhost:5035/api/users'

    }
}
const urlService = (process.env.NODE_ENV === "production") ? new Production() : new Development();

export default urlService;