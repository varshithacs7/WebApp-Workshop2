import { BlogEntry } from "./blog-entry.dto";

export class User {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    blogEntries?: BlogEntry[];
}
