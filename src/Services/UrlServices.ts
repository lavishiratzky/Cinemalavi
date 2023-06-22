abstract class Global{
}
class Development extends Global{
    public urls = {
        
        movies: "http://localhost:5035/api/movies",
       orders:  "http://localhost:5035/api/orders",
       users: 'http://localhost:5035/api/users',
       admins: "http://localhost:5035/api/admin"


    }
}


class Production extends Global{
    public urls ={
 
        movies: 'http://localhost:5035/api/movies',
        orders: "http://localhost:5035/api/orders",
        users: 'http://localhost:5035/api/users',
        admins: "http://localhost:5035/api/admin"

    }
}
const urlService = (process.env.NODE_ENV === "production") ? new Production() : new Development();

export default urlService;