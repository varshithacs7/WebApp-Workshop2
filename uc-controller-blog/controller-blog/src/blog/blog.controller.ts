import { Controller, Post, Body, Request, UseGuards, Get, Query, Param, Delete, Put } from "@nestjs/common";
import { Observable, of } from "rxjs";
import { JwtAuthGuard } from "../guards/jwt-guard";
import { BlogService } from "./blog.service";
import { BlogEntry } from "../dto/blog-entry.dto";

@Controller("blog-entries")
export class BlogController {
    constructor(private blogService: BlogService) {}

    @UseGuards(JwtAuthGuard)
    @Post("create")
    createBlog(@Body() blogEntry: BlogEntry, @Request() req): Observable<BlogEntry> {
        const user = req.user;
        return this.blogService.createBlog(user, blogEntry);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    updateOneBlog(@Param("id") id: number, @Body() blogEntry: BlogEntry): Observable<BlogEntry> {
        return this.blogService.updateOneBlog(Number(id), blogEntry);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    deleteOneBlog(@Param("id") id: number): Observable<any> {
        return this.blogService.deleteOneBlog(Number(id));
    }

    @Get(":id")
    findOneBlog(@Param("id") id: number): Observable<BlogEntry> {
        return this.blogService.findOneBlog(Number(id));
    }

    @Get("")
    findAllBlog(): Observable<any> {
        return this.blogService.findAllBlog();
    }

    @Get("user/:user")
    findAllBlogByUser(@Param("user") userId: number): Observable<any> {
        return this.blogService.findAllBlogByUser(Number(userId));
    }

    /** Functions with pagination */
    // @Get("")
    // findAllBlog(@Query("page") page: number = 1, @Query("limit") limit: number = 10): Observable<any> {
    //     return this.blogService.paginateAll(page, limit);
    // }

    // @Get("user/:user")
    // findAllBlogByUser(@Query("page") page: number = 1, @Query("limit") limit: number = 10, @Param("user") userId: number): Observable<any> {
    //     return this.blogService.paginateAllByUser(page, limit, Number(userId));
    // }
}
