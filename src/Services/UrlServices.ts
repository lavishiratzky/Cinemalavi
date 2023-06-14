abstract class Global{
}
class Development extends Global{
    public urls = {
        
        movies: "http://localhost:5035/api/movies",
       orders:  "http://localhost:5035/api/orders",
       users: 'http://localhost:5035/api/users'


    }
}

//"https://raw.githubusercontent.com/nogaoren/ordersDB/main/ordersDB", nogas database
class Production extends Global{
    public urls ={
 
        movies: 'http://localhost:5035/api/movies',
        orders: "http://localhost:5035/api/orders",
        users: 'http://localhost:5035/api/users'

    }
}
const urlService = (process.env.NODE_ENV === "production") ? new Production() : new Development();

export default urlService;