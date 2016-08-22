import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AboutComponent} from './about.component';
import {AppComponent} from './app.component';
import {AddComponent} from './add.component';
import {HomeComponent} from './home.component';
import {PostsCompoent} from './posts.component';

import {enableProdMode} from '@angular/core';
enableProdMode();

const routing = RouterModule.forRoot([
    { path: '',      component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'add', component: AddComponent },
    { path: 'posts', component: PostsCompoent }
]);

@NgModule({
    imports: [BrowserModule,
    		  routing,
    		  HttpModule,
    		  FormsModule,
    		  ReactiveFormsModule],
    declarations: [AppComponent,
    			   AboutComponent,
    			   HomeComponent,
                   AddComponent,
                   PostsCompoent],
    bootstrap: [AppComponent]
})

export class AppModule {}