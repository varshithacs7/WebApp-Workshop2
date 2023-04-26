import { Controller, UseInterceptors, Post, Body, Request, UseGuards, Get, Query, Param, Delete, Put, UploadedFile, Res } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Observable, of } from "rxjs";
import { diskStorage } from "multer";
import path = require("path");
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { JwtAuthGuard } from "../auth/guards/jwt-guard";
import { BlogService } from "./blog.service";
import { BlogEntry } from "../dto/blog-entry.dto";
import { Image } from "../dto/image.dto";

export const storage = {
    storage: diskStorage({
        destination: "./uploads/blog-entry-images",
        filename: (_req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, "") + uuidv4();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`);
        },
    }),
};

@Controller("blog-entries")
export class BlogController {
    constructor(private blogService: BlogService) {}

    @UseGuards(JwtAuthGuard)
    @Post("create")
    createBlog(@Body() blogEntry: BlogEntry, @Request() req): Observable<BlogEntry> {
        return this.blogService.createBlog(blogEntry, req);
    }

    @Get("")
    indexBlog(@Query("page") page: number = 1, @Query("limit") limit: number = 10): Observable<any> {
        return this.blogService.indexBlog(page, limit);
    }

    @Get("user/:user")
    indexBlogByUser(@Query("page") page: number = 1, @Query("limit") limit: number = 10, @Param("user") userId: number): Observable<any> {
        return this.blogService.indexBlogByUser(page, limit, userId);
    }

    @Get(":id")
    findOneBlog(@Param("id") id: number): Observable<BlogEntry> {
        return this.blogService.findOneBlog(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    updateOneBlog(@Param("id") id: number, @Body() blogEntry: BlogEntry): Observable<BlogEntry> {
        return this.blogService.updateOneBlog(id, blogEntry);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    deleteOneBlog(@Param("id") id: number): Observable<any> {
        return this.blogService.deleteOneBlog(id);
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor("file", storage))
    @Post("image/upload")
    uploadBlogFile(@UploadedFile() file, @Request() _req): Observable<Image> {
        return of(file);
    }

    @Get("image/:imagename")
    findBlogImage(@Param("imagename") imagename, @Res() res): Observable<Object> {
        return of(res.sendFile(join(process.cwd(), "uploads/blog-entry-images/" + imagename)));
    }
}
