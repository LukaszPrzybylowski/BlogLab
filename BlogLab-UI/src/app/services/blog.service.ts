import { HttpClient, HttpParameterCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogCraete } from '../models/blog/blog-craete.model';
import { BlogPaging } from '../models/blog/blog-paging.model';
import { Blog } from '../models/blog/blog.model';
import { PagedResult } from '../models/blog/paged-result.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private http: HttpClient
  ) { }

  create(model: BlogCraete) : Observable<Blog> {
    return this.http.post<Blog>(`${environment.webApi}/Blog`, model);
  }

  getAll(blogPaging: BlogPaging) : Observable<PagedResult<Blog>>{
    return this.http.get<PagedResult<Blog>>
    (`${environment.webApi}/Blog?Page=${blogPaging.page}&PageSize=${blogPaging.pageSize}`);
  }

  get(blogId: number): Observable<Blog> {
    return this.http.get<Blog>(`${environment.webApi}/Blog/${blogId}`);
  }

  getByApplicationUserId(applicationUserId: number) : Observable<Blog[]>{
    return this.http.get<Blog[]>(`${environment.webApi}/Blog/user/${applicationUserId}`);
  }

  getMostFamous() : Observable<Blog[]>{
    return this.http.get<Blog[]>(`${environment.webApi}/Blog/famous`);
  }

  delete(blogId: number) : Observable<number>{
    return this.http.delete<number>(`${environment.webApi}/Blog/${blogId}`);
  }
}
