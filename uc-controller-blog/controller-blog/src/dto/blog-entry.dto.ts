import { User } from "./user.dto";

export class BlogEntry {
    id?: number;
    title?: string;
    slug?: string;
    description?: string;
    body?: string;
    createdAt?: Date;
    updatedAt?: Date;
    likes?: number;
    author?: User;
    headerImage?: string;
    publishedDate?: Date;
    isPublished?: boolean;
}
