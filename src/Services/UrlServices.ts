abstract class Global{
}
class Development extends Global{
    public urls = {
        movies: "https://raw.githubusercontent.com/Adiper84/moviesDB/main/moviesdb.txt",
       orders: "https://raw.githubusercontent.com/nogaoren/ordersDB/main/ordersDB",
    }
}
class Production extends Global{
    public urls ={
        movies: 'www.clalit-app.com/api/tasks',
        orders: "https://raw.githubusercontent.com/nogaoren/ordersDB/main/ordersDB"
    }
}
const urlService = (process.env.NODE_ENV === "production") ? new Production() : new Development();

export default urlService;