import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';



import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { nodeserver } from '../../environments/environment'
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpRequest} from '@angular/common/http';
//import { JSONP_ERR_WRONG_RESPONSE_TYPE } from '@angular/common/http/src/jsonp';
import { MethodCall } from '@angular/compiler';
import { DatabaseService } from '../services/database-service.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId: any;


  mysession: '5a4c50b645e2964054e516c8';

  results: string[];
  constructor(public http: HttpClient, private storage: Storage
  ) {
    console.log('Hello AuthenticateProvider Provider');
  }

  loginMongoDB(logindata) {
 
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    //headers?: HttpHeaders | {[header: string]: string | string[]}, 
    return this.http.post(nodeserver + '/authenticate/rest/login/', logindata, { headers: headers }).pipe(map(res => res));
  }

  registerNewUser(registerdetails){
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(nodeserver + '/authenticate/rest/userregister/', registerdetails, { headers: headers });
      
  }


  getCategories(session):Observable<any>{
  

    
    return this.http.post(nodeserver + '/item/getcategories/', {
      headers: new HttpHeaders({
        'session': session
      })})
  

  .pipe(map(res => res));
  }


  getAllItems(session,item_id){
    console.log("get All items called"+item_id);

    return this.http.post(nodeserver + '/item/getitemlist/',{'item_id':item_id}, {
      headers: new HttpHeaders({
        'session': session,
      })}).pipe(map(res => res));
  

  }


  postAdvt(createitem){
    console.log("postAdvt called");
    
  /*     return this.http.post(nodeserver + '/item/postadvt/', createitem,

        {
          headers: new HttpHeaders({
            'session': createitem.session,
            'Content-Type': 'application/json'

          })

        }).pipe(map(res=>res))

}
 */

// req as HttpRequest<any>).clone({ setHeaders: { 'auth': token } }

var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('session','6096a11139461b286b101389');
    return this.http.post(nodeserver + '/item/postadvt/', createitem,{ headers: { 'session': createitem.item_postedby }

     }).pipe(map(res => res));

}

}




