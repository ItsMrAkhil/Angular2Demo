import {Component, OnInit} from '@angular/core';
import {InfiniteScroll} from 'angular2-infinite-scroll';

import {PostComponent} from './post.component';
import {PostService} from './post.service';

@Component({
    selector: 'posts',
    template: `
        <div class="card"
            infinite-scroll
            [infiniteScrollDistance]="0.01"
            [infiniteScrollThrottle]="100"
            (scrolled)="onScroll()"
        >
            <h5 class="card-header">
                All Posts Infinite Scroll
            </h5>
            <div class="card-block">
                <div *ngFor="let post of posts">
                    <post [data]="post"></post>
                </div>
            </div>
        </div>
    `,
    providers: [PostService],
    directives: [PostComponent, InfiniteScroll]
})
export class PostsCompoent implements OnInit{
    posts: any[];
    next: string;
    constructor(private _postService: PostService) {  }

    ngOnInit(){
        this._postService.getPosts().subscribe(
            res => {
                this.posts = res.json().posts;
                this.next = res.json().next;
            }
        );
    }

    onScroll(){
        if(this.next){
            this._postService.getPosts(this.next).subscribe(
                res => {
                    this.posts = this.posts.concat(res.json().posts);
                    this.next = res.json().next;
                }
            );
        }
    }
}