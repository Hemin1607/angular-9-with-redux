import { Component,ViewChild ,OnInit } from '@angular/core';
import { IAppState } from './store';
import { LOGIN_USER_DATA , LOGOUT_USER_DATA} from './actions';
import { NgRedux, select } from '@angular-redux/store';
import {  Router, ActivatedRoute,NavigationEnd,Event } from '@angular/router';


/*
	created by : Hemin patel
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angularredux';
  constructor(private ngRedux: NgRedux<IAppState>,private  router:Router){

  }

  ngOnInit(): void {
  }
  isLogin(){
    if(sessionStorage.getItem('token')){
        return true;
    }else{
        return false;
    }
  }
  logout(){
    this.ngRedux.dispatch({type: LOGOUT_USER_DATA, user: []});
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    this.router.navigate(['/'])
  }
  	
}
