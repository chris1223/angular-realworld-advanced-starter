import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  article: Article;

  constructor(private route: ActivatedRoute, private articleService: PostService) { }

  ngOnInit() {
    this.route.paramMap
      // .pipe(switchMap(params => params.get('id')), tap(id => (this.id = +id)))
      .subscribe(params => {
        this.articleService.getArticle(params.get('id'))
          .subscribe(article => {
            this.article = article.article;
          });
      });

  }

}
