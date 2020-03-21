import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  article: Article;
  article$: Observable<Article>;

  constructor(private route: ActivatedRoute, private articleService: PostService) { }

  ngOnInit() {
    // this.route.paramMap
    //   // .pipe(switchMap(params => params.get('id')), tap(id => (this.id = +id)))
    //   .subscribe(params => {
    //     this.articleService.getArticle(params.get('id'))
    //       .subscribe(article => {
    //         this.article = article.article;
    //       });
    //   });
    this.article$ = this.route.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      switchMap(id => this.articleService.getArticle(id)),
      map(article => article.article)
    );

  }

}
