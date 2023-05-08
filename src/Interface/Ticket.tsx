import { User } from "../Interface/User";
import { EnumStatus } from "../Interface/EnumStatus";

export interface Ticket {
    /** A unique identifier for the ticket */
    id: number;
    /** The human-friendly title of the ticket */
    name: string;
    /** The instructions and content of the ticket */
    description: string;
    /** The status of the ticket indicating whether it has been resolved or not */
    status: EnumStatus;
    /** The priority of the ticket */
    priority: number;
    /** When the ticket was last modified */
    last_modified: Date;
    /** The previous version of the ticket */
    previous_version: Ticket | null;
    /** An image representing the ticket */
    image: string;
    /** The author of the ticket */
    author: User | null;
    /** The assignee/resolver of the ticket */
    assignee: User | null;
}
