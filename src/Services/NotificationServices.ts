import { Notyf } from "notyf";

class NotificationServices{

private notification = new Notyf({duration:4000, position:{x:"left",y:"top"}});

public success(message:string) {
    this.notification.success(message);

}
public failure(message:string){
    this.notification.error(message);
}
}
const notifyService = new NotificationServices();
export default notifyService;