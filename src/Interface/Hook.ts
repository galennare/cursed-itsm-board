/*
    These are not UI components! These are relics from the TicketDatabase
    that can still serve a purpose in being helpful data for passing
    stateful values to components.

    What does that mean?

    Say we have a variable in App.tsx called tickets of type Ticket[]
    which stores all the ticket objects. Both the AdminList and the
    CentralList components need the ability to modify this variable.
    To do this, in App.tsx you call use state on tickets to get a
    setter function. CentralList and AdminList need to accept this
    function as a parameter so I have created this type alias to
    make that easy to do. Just have the component accept a variable
    of type StateSetter<Ticket[]>.
*/

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
export type Hook<T> = [T, StateSetter<T>];
