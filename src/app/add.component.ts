import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Headers, Http, RequestOptions} from '@angular/http';

import {PostService} from './post.service';
import {PostValidators} from './post.validators';

@Component({
    selector: 'add',
    templateUrl: 'app/add.component.html',
    providers: [PostService]
})
export class AddComponent implements OnInit{
    private _options = new RequestOptions(
        { 
            headers: new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' })
        }
    );
    private _addPostForm: FormGroup;

    private _infoMsg = { message: "", type: "info"};

    constructor(private _postService: PostService,
        private _formBuilder: FormBuilder){ }

    ngOnInit(){
        this._addPostForm = this._formBuilder.group({
            title: ['', Validators.compose([
                Validators.required, PostValidators.minTitleLength
                ])],
            image: ['', Validators.compose([
                Validators.required, PostValidators.validImage, PostValidators.minImageLength
            ])],
            description: ['', Validators.compose([
                Validators.required, PostValidators.minPostLength
            ])]
        });
    }

    submitAdd(){
        this._postService.addPost(this._addPostForm.value).subscribe(
            res => {
                if(res.json().success){
                    this.showInfo('Item added succesfully.', 'success');
                } else {
                    this.showInfo('Something went wrong.', 'danger');
                }
            }
        )
    }
    showInfo(message:string, type:string, time:number = 3000){
        this._infoMsg.message = message;
		this._infoMsg.type = type;
		window.setTimeout(() => this._infoMsg.message = "", time);
    }
}