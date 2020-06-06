import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { map, catchError } from 'rxjs/operators';
import * as socketIo from 'socket.io-client';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import {configData} from '../../environments/configData';
import { Subject }    from 'rxjs/Subject';



/*
	created by : Hemin patel
 */
//service file for user basic opration 
//add,edit,delete and get user

@Injectable()
export class UserService {
	serverUrl : any = configData.apiUrl;
  private editID = new Subject<string>(); 
  editID$ = this.editID.asObservable();
  constructor(private http: HttpClient) {
  }

  //service for login api,check user if and password
    public checkuser(userdata): Observable<any> {
      return this.http.post(this.serverUrl+`/api/login`,userdata).pipe(
        map((res) => {
          console.log("tetstette",res);
          return res;
        }),
        catchError(this.handleError));
    }
    //service for  add user on databse , call server API for insert user 
    public adduser(userdata): Observable<any> {
      return this.http.post(this.serverUrl+`/api/insert`,userdata).pipe(
        map((res) => {
          return res;
        }),
        catchError(this.handleError));
    }
    //service for  get one user from  databse for fill Edit form
    public oneuser(userdata): Observable<any> {
      return this.http.post(this.serverUrl+`/api/oneuser`,userdata).pipe(
        map((res) => {
          return res;
        }),
        catchError(this.handleError));
    }
    //service for  delete user on databse , call server API for Delete user
    public deleteuser(userdata): Observable<any> {
      return this.http.post(this.serverUrl+`/api/delete`,userdata).pipe(
        map((res) => {
          return res;
        }),
        catchError(this.handleError));
    }

    public changeEditID(data: string) {
        this.editID.next(data);
    }
    
    private handleError(error) {
	    if (error.error instanceof Error) {
          console.log(error.error.message)
	        let errMessage = error.error.message;
	        return Observable.throw(errMessage);
	    }
	    return Observable.throw(error);
	  }
}