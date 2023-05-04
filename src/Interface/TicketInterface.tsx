/*
    THIS IS NOT A UI COMPONENT. This interface defines our data structure 
    for a single ticket. This is NOT a UI component but rather a declaration
    of the properties that exist on a Ticket instance.

    IMPORTANT: If you want to have a variable of type Ticket anywhere else
    in the program you MUST import the interface for it from this file!
    Trying to create an object with the same properties is NOT sufficient
    so the variable must be declared with a type of Ticket or TypeScript
    will get mad!
*/

export interface Ticket {
    id: number;
    title: string;
    description: string;
    priority: 0 | 1 | 2 | 3 | 4 | 5;
    last_modified: Date;
    author: string;
    status: "Pending" | "In-Progress" | "Resolved";
    assignee: string;
    image_path: string;
}