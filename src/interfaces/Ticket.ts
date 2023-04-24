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
