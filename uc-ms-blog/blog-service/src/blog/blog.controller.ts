import { Controller, UseGuards } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { BlogService } from "./blog.service";
import { BlogEntry } from "../dto/blog-entry.dto";
import { UserIsAuthorGuard } from "./user-is-author.guard";

export const BLOG_ENTRIES_URL = "http://localhost:3007/api/blog-entries";

@Controller()
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    @MessagePattern("createBlog")
    createBlog(data: any): Observable<BlogEntry> {
        const { blogEntry, req } = data;
        const user = req.user;
        return this.blogService.createBlog(user, blogEntry);
    }

    @MessagePattern("indexBlog")
    indexBlog(data: any) {
        let { page, limit } = data;
        limit = limit > 100 ? 100 : limit;

        return this.blogService.paginateAll({
            limit: Number(limit),
            page: Number(page),
            route: BLOG_ENTRIES_URL,
        });
    }

    @MessagePattern("indexBlogByUser")
    indexBlogByUser(data: any) {
        let { page, limit, userId } = data;
        limit = limit > 100 ? 100 : limit;

        return this.blogService.paginateByUser(
            {
                limit: Number(limit),
                page: Number(page),
                route: BLOG_ENTRIES_URL + "/user/" + userId,
            },
            Number(userId)
        );
    }

    @MessagePattern("findOneBlog")
    findOneBlog(data: any): Observable<BlogEntry> {
        return this.blogService.findOneBlog(data.id);
    }

    @UseGuards(UserIsAuthorGuard)
    @MessagePattern("updateOneBlog")
    updateOneBlog(data: any): Observable<BlogEntry> {
        const { id, blogEntry } = data;
        return this.blogService.updateOneBlog(Number(id), blogEntry);
    }

    @UseGuards(UserIsAuthorGuard)
    @MessagePattern("deleteOneBlog")
    deleteOneBlog(data: any): Observable<any> {
        return this.blogService.deleteOneBlog(data.id);
    }
}
