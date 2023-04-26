import { useState } from "react";
import { UserRole } from "./components/NavigationBar";
import { Ticket } from "./components/TicketItem";

/*
    To make this magic happen I am using these two type aliases I've defined
    as well as TypeScript Generics which is a concept we did not cover in
    class but we've sortof already used with useState(). 


    --Explanation of whats happening--

    When you use the the function useState() you would do the following:
    const [myVariable, setMyVariable] = useState<myType>(someValue);

    where myVariable is the value and setMyVariable is a setter function
    for updating that value.

    Since we will need to easily pass these values and variable between the
    database and appropriate components I have created the following types.

    StateSetter is an instance of the setter function. If we are referencing
    the above example then setMyVariable would be of type StateSetter<myType>.
    This is useful when we write functions or components that need to accept
    these functions as a parameter in order to update values. Example:

    function myFunction(value: Ticket, setter: StateSetter<Ticket>);

    I have also created a type called Hook which is an alias for a pair/tuple
    of a value and its setter to keep them grouped together. Referring back
    to our example I could create a single variable that contains our value
    and setter like such:

    const myTicket: Hook<Ticket> = [myVariable, setMyVariable];
    or
    const myNumber: Hook<number> = [myVarNumber, setMyNumber];

    and I can access/use these like this:

    <div>{myTicket[0].title}</div>
    <div>{myNumber[0]}</div>
    myTicket[1]({ some new ticket instance })  // updates the value to some new ticket
    myNumber[1](14);  // updates the value to 14

    This is useful for managing many tickets in an array that can each be
    updated independent of each other.

    const myTicketList: Hook<Ticket> = [];
*/
export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
export type Hook<T> = [T, StateSetter<T>];

export class TicketDatabase {
    // these are lists of tuples containing [value, hook] to allow editing individual components
    private _centralList: Hook<Ticket>[];
    private _setCentralList: StateSetter<Hook<Ticket>[]>;

    // to reduce headache I am storing admin and user lists by ticket ID that then gets mapped to an actual ticket when user requests it
    private _adminList: number[];
    private _setAdminList: StateSetter<number[]>;
    private _userLists: number[][];
    private _setUserLists: StateSetter<number[][]>;

    constructor(tickets?: Ticket[]) {
        // if we are provided a list of tickets, add hooks to all of them; We should now have a list of [ticket, hook] tuples
        let hookedTickets: Hook<Ticket>[];

        if (tickets !== undefined)
            hookedTickets = tickets.map((ticket: Ticket) => {
                const [newTicket, setter] = useState<Ticket>(ticket);
                return [newTicket, setter];
            });
        else hookedTickets = [];

        // Create the central list from hooked tickets
        const [centralList, setCentralList] =
            useState<Hook<Ticket>[]>(hookedTickets);
        this._centralList = centralList;
        this._setCentralList = setCentralList;

        // Create the admin and user lists. These lists are subsets of the central list and only contain the ticket IDs for simplicity that are then mapped to the actual ticket tuples when we call the getter/setter functions later
        const [adminList, setAdminList] = useState<number[]>([]);
        this._adminList = adminList;
        this._setAdminList = setAdminList;
        const [userLists, setUserLists] = useState<number[][]>([[], [], []]);
        this._userLists = userLists;
        this._setUserLists = setUserLists;
    }

    get centralList(): Hook<Ticket>[] {
        return this._centralList;
    }

    get adminList(): Hook<Ticket>[] {
        // maps the numbers in the admin list to [ticket, hook] tuples in the central list by their ID and returns the list of [ticket, hook] tuples
        return this._adminList.map((ticketID: number) => {
            return this._centralList.filter(
                (ticketTuple: Hook<Ticket>) => ticketTuple[0].id === ticketID
            )[0];
        });
    }

    getUserList(user: UserRole): Hook<Ticket>[] {
        // user is used as index number for which user list to reference
        // the list of numerical ids is then mapped to [ticket, hook] tuples in the central list and returned
        return this._userLists[user].map((ticketID: number) => {
            return this._centralList.filter((ticketTuple: Hook<Ticket>) => {
                return ticketTuple[0].id === ticketID;
            })[0];
        });
    }

    addTicketToCentralList(ticket: Ticket): void {
        // ensure the ticket ID is unique
        if (
            this._centralList.filter((item: Hook<Ticket>) => {
                item[0].id === ticket.id;
            }).length > 0
        )
            return;
        // add a hook to the ticket

        // add ticket to central list
    }

    deleteTicketFromCentralList(ticket: Ticket): void {
        // get ticket index
        // remove ticket at index
    }

    addTicketToAdminList(ticket: Ticket): void {}

    removeTicketFromAdminList(ticket: Ticket): void {}

    addTicketToUserList(ticket: Ticket, user: UserRole): void {}

    removeTicketFromUserList(ticket: Ticket, user: UserRole): void {}
}

export function removeTicketFromDatabase(ticket: Ticket): void {
    const index = ticketDB.indexOf(ticket);
    const newTickets = [...ticketDB];
    if (index > -1) newTickets.splice(index, 1);
    setTicketDB(newTickets);
}

export function getTicketByID(id: number): Ticket {
    const index = ticketDB.findIndex((q) => q.id == id);
}
