import { Ticket } from "../Interface/Ticket";

export interface User {
    /** the username of the user */
    username: string;
    /** the name of the user */
    name: string;
    /** the image of the user */
    image: string;
    /** the ticket list of the user */
    ticket_list: Ticket[];
}
