import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import type { Observable } from "rxjs";
import { BlogEntry } from "../dto/blog-entry.dto";
import { Image } from "../dto/image.dto";

@Injectable()
export class BlogService {
    constructor(@Inject("BLOG") private readonly client: ClientProxy) {}

    createBlog(blogEntry, req): Observable<BlogEntry> {
        return this.client.send("createBlog", { blogEntry, req });
    }

    indexBlog(page, limit): Observable<any> {
        return this.client.send("indexBlog", { page, limit });
    }

    indexBlogByUser(page, limit, userId): Observable<any> {
        return this.client.send("indexBlogByUser", { page, limit, userId });
    }

    findOneBlog(id): Observable<BlogEntry> {
        return this.client.send("findOneBlog", { id });
    }

    updateOneBlog(id, blogEntry): Observable<BlogEntry> {
        return this.client.send("updateOneBlog", { id, blogEntry });
    }

    deleteOneBlog(id): Observable<any> {
        return this.client.send("deleteOneBlog", { id });
    }
}
