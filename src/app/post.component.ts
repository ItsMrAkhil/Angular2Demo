import {Component, Input} from '@angular/core';

@Component({
    selector: 'post',
    template: `
        <div class="media">
            <a class="media-left" href="#">
                <img class="media-object" src="{{data.image}}" alt="Generic placeholder image">
            </a>
            <div class="media-body">
                <h4 class="media-heading">{{data.title}}</h4>
                {{data.description}}
            </div>
        </div>
        <hr class="m-y-2">  
    `
})
export class PostComponent{
    @Input() data;
}