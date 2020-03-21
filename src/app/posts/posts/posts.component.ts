import { Component, OnInit } from '@angular/core';
import { Articles, Article } from '../article';
import { PostService } from '../post.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError, share } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  articles: Article[];
  articles$: Observable<Articles>;
  articleList$: Observable<Article[]>;

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    // this.postService.getArticles().subscribe(articles => {
    //   this.articles = articles.articles;
    //   console.log(articles);
    // });
    this.articleList$ = this.postService.getArticles().pipe(
      map(articles => articles.articles),
      catchError(
        () => {
          return throwError({});
        }),
      share()
    );
  }

}
