import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class PostService{
    private _options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' }) });

    constructor(private _http: Http){ }

    getPosts(url:string = '/api/posts'){
        return this._http.get(url);
    }
    addPost(post){
        return this._http.post('/api/post', JSON.stringify(post), this._options);
    }
}