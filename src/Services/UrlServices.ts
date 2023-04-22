abstract class Global{
}
class Development extends Global{
    public urls = {
        movies: "https://raw.githubusercontent.com/Adiper84/moviesDB/main/moviesdb.txt",
       
    }
}
class Production extends Global{
    public urls ={
        movies: 'www.clalit-app.com/api/tasks',
       
    }
}
const urlService = (process.env.NODE_ENV === "production") ? new Production() : new Development();

export default urlService;