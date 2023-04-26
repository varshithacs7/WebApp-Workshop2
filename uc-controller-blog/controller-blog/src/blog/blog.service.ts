import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Equal } from "typeorm";
// import { Pagination, IPaginationOptions, paginate } from "nestjs-typeorm-paginate";
import { Observable, of, from } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import slugify from "slugify";
import { BlogEntry } from "../dto/blog-entry.dto";
import { BlogEntryEntity } from "../entities/blog-entry.entity";
import { User } from "../dto/user.dto";

@Injectable()
export class BlogService {
    blogUrl = "http://localhost:3007/api/blog-entries";

    constructor(@InjectRepository(BlogEntryEntity) private readonly blogRepository: Repository<BlogEntryEntity>) {}

    generateSlug(title: string): Observable<string> {
        return of(slugify(title));
    }

    createBlog(user: User, blogEntry: BlogEntry): Observable<BlogEntry> {
        blogEntry.author = user;

        return this.generateSlug(blogEntry.title).pipe(
            switchMap((slug: string) => {
                blogEntry.slug = slug;
                return from(this.blogRepository.save(blogEntry));
            })
        );
    }

    updateOneBlog(id: number, blogEntry: BlogEntry): Observable<BlogEntry> {
        return from(this.blogRepository.update(id, blogEntry)).pipe(switchMap(() => this.findOneBlog(id)));
    }

    deleteOneBlog(id: number): Observable<any> {
        return from(this.blogRepository.delete(id));
    }

    findOneBlog(id: number): Observable<BlogEntry> {
        return from(this.blogRepository.findOne({ where: { id }, relations: ["author"] }));
    }

    findAllBlog(): Observable<BlogEntry[]> {
        return from(this.blogRepository.find({ relations: ["author"] }));
    }

    findAllBlogByUser(userId: number): Observable<BlogEntry[]> {
        return from(
            this.blogRepository.find({
                where: {
                    author: Equal(userId),
                },
                relations: ["author"],
            })
        ).pipe(map((blogEntries: BlogEntry[]) => blogEntries));
    }

    // paginateAll(page: number, limit: number): Observable<Pagination<BlogEntry>> {
    //     limit = limit > 100 ? 100 : limit;

    //     const options: IPaginationOptions = {
    //         limit: Number(limit),
    //         page: Number(page),
    //         route: this.blogUrl,
    //     };

    //     return from(
    //         paginate<BlogEntry>(this.blogRepository, options, {
    //             relations: ["author"],
    //         })
    //     ).pipe(map((blogEntries: Pagination<BlogEntry>) => blogEntries));
    // }

    // paginateAllByUser(page: number, limit: number, userId: number): Observable<Pagination<BlogEntry>> {
    //     limit = limit > 100 ? 100 : limit;

    //     const options: IPaginationOptions = {
    //         limit: Number(limit),
    //         page: Number(page),
    //         route: this.blogUrl + "/user/" + userId,
    //     };

    //     return from(
    //         paginate<BlogEntry>(this.blogRepository, options, {
    //             relations: ["author"],
    //             where: [{ author: Equal(userId) }],
    //         })
    //     ).pipe(map((blogEntries: Pagination<BlogEntry>) => blogEntries));
    // }
}
