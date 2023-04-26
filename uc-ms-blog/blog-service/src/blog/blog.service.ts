import { Injectable } from "@nestjs/common";
import { Observable, of, from } from "rxjs";
import { BlogEntry } from "../dto/blog-entry.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { BlogEntryEntity } from "../entities/blog-entry.entity";
import { Repository, Equal } from "typeorm";
import { User } from "../dto/user.dto";
import { switchMap, map } from "rxjs/operators";
import { Pagination, IPaginationOptions, paginate } from "nestjs-typeorm-paginate";
import slugify from "slugify";

@Injectable()
export class BlogService {
    constructor(@InjectRepository(BlogEntryEntity) private readonly blogRepository: Repository<BlogEntryEntity>) {}

    createBlog(user: User, blogEntry: BlogEntry): Observable<BlogEntry> {
        blogEntry.author = user;
        console.log(blogEntry);
        return this.generateSlug(blogEntry.title).pipe(
            switchMap((slug: string) => {
                blogEntry.slug = slug;
                return from(this.blogRepository.save(blogEntry));
            })
        );
    }

    findAll(): Observable<BlogEntry[]> {
        return from(this.blogRepository.find({ relations: ["author"] }));
    }

    paginateAll(options: IPaginationOptions): Observable<Pagination<BlogEntry>> {
        return from(
            paginate<BlogEntry>(this.blogRepository, options, {
                relations: ["author"],
            })
        ).pipe(map((blogEntries: Pagination<BlogEntry>) => blogEntries));
    }

    paginateByUser(options: IPaginationOptions, userId: number): Observable<Pagination<BlogEntry>> {
        return from(
            paginate<BlogEntry>(this.blogRepository, options, {
                relations: ["author"],
                where: [{ author: Equal(userId) }],
            })
        ).pipe(map((blogEntries: Pagination<BlogEntry>) => blogEntries));
    }

    findOneBlog(id: number): Observable<BlogEntry> {
        return from(this.blogRepository.findOne({ where: { id }, relations: ["author"] }));
    }

    findByUser(userId: number): Observable<BlogEntry[]> {
        return from(
            this.blogRepository.find({
                where: {
                    author: Equal(userId),
                },
                relations: ["author"],
            })
        ).pipe(map((blogEntries: BlogEntry[]) => blogEntries));
    }

    updateOneBlog(id: number, blogEntry: BlogEntry): Observable<BlogEntry> {
        return from(this.blogRepository.update(id, blogEntry)).pipe(switchMap(() => this.findOneBlog(id)));
    }

    deleteOneBlog(id: number): Observable<any> {
        return from(this.blogRepository.delete(id));
    }

    generateSlug(title: string): Observable<string> {
        return of(slugify(title));
    }
}
