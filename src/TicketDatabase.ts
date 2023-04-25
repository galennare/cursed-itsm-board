import { useState } from "react";
import { UserRole } from "./components/NavigationBar";
import { Ticket } from "./components/TicketItem";

export class TicketDatabase {
    // these are lists of tuples containing [value, hook] to allow editing individual components
    private _centralList: [
        Ticket,
        React.Dispatch<React.SetStateAction<Ticket>>
    ][];
    private _setCentralList: React.Dispatch<
        React.SetStateAction<
            [Ticket, React.Dispatch<React.SetStateAction<Ticket>>][]
        >
    >;

    // to reduce headache I am storing admin and user lists by ticket ID that then gets mapped to an actual ticket when user requests it
    private _adminList: number[];
    private _setAdminList: React.Dispatch<React.SetStateAction<number[]>>;
    private _userLists: number[][];
    private _setUserLists: React.Dispatch<React.SetStateAction<number[][]>>;

    constructor(tickets?: Ticket[]) {
        // if we are provided a list of tickets, add hooks to all of them; We should now have a list of [ticket, hook] tuples
        let hookedTickets: [
            Ticket,
            React.Dispatch<React.SetStateAction<Ticket>>
        ][];

        if (tickets !== undefined)
            hookedTickets = tickets.map((ticket: Ticket) => {
                const [newTicket, hook] = useState<Ticket>(ticket);
                return [newTicket, hook];
            });
        else hookedTickets = [];

        // Create the central list from hooked tickets
        const [centralList, setCentralList] =
            useState<[Ticket, React.Dispatch<React.SetStateAction<Ticket>>][]>(
                hookedTickets
            );
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

    get centralList(): [
        Ticket,
        React.Dispatch<React.SetStateAction<Ticket>>
    ][] {
        return this._centralList;
    }

    get adminList(): [Ticket, React.Dispatch<React.SetStateAction<Ticket>>][] {
        // maps the numbers in the admin list to [ticket, hook] tuples in the central list by their ID and returns the list of [ticket, hook] tuples
        return this._adminList.map((ticketID: number) => {
            return this._centralList.filter(
                (
                    ticketTuple: [
                        Ticket,
                        React.Dispatch<React.SetStateAction<Ticket>>
                    ]
                ) => ticketTuple[0].id === ticketID
            )[0];
        });
    }

    getUserList(
        user: UserRole
    ): [Ticket, React.Dispatch<React.SetStateAction<Ticket>>][] {
        // user is used as index number for which user list to reference
        // the list of numerical ids is then mapped to [ticket, hook] tuples in the central list and returned
        return this._userLists[user].map((ticketID: number) => {
            return this._centralList.filter(
                (
                    ticketTuple: [
                        Ticket,
                        React.Dispatch<React.SetStateAction<Ticket>>
                    ]
                ) => {
                    return ticketTuple[0].id === ticketID;
                }
            )[0];
        });
    }

    addTicketToCentralList(ticket: Ticket): void {
        // ensure the ticket ID is unique
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
