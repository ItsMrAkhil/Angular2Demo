import {Component, OnInit} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
	selector: 'home',
	templateUrl: 'app/home.component.html',
	styles:[
		`.jumbotron{
			margin-top: 20px;}
		`
	]
})

export class HomeComponent{ }