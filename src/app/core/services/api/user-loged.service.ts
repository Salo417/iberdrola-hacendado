import { Injectable } from '@angular/core';
import { IUser } from 'src/app/core/classes/IUser';
import { Observable, throwError, lastValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpContext, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@capacitor/core';


class User implements IUser {
  email: string;
  password: string;
  picture?: string;

  constructor(user: string, password: string, picture?: string) {
    this.email     = user;
    this.password = password;
    this.picture  = picture;
  }
}

@Injectable({
  providedIn: 'platform'
})
export class UserLogedService {
  // PROPIEDADES
  private static instantied: boolean = false;

  private static readonly DOM:           string = 'localhost';
  private static readonly API_URL_USERS: string = 'api/iberdrola-hacendado-users';
  private static readonly API_PORT:      string = '1337';
  private static readonly FULL_API_POST: string = `http://${UserLogedService.DOM}:${UserLogedService.API_PORT}/${UserLogedService.API_URL_USERS}`;

  private _user: User;


  // CONSTRUCTORES
  constructor(private http: HttpClient) {
    if (UserLogedService.instantied) {
      throw new Error('Service UserLogedService is created yet, you only can create 1 instance of this service.')
    }

    UserLogedService.instantied = true;
  }

  // GETTERS
  public get user(): (User | null) { return this._user; }

  // SETTERS
  public set user(user: User) {
    if (user.email.length <= 0) {
      console.log("Cadena no puede estár vacía. Arreglar esto en el futuro con throw exception y password también y otras variables y en el otro setter.");
    }

    this._user = user;
  }


  // MÉTODOS
  private httpErrorGenerator(error: HttpErrorResponse, caught: Observable<string>) {
    let retErrorException: Error = null;

    if (error.status === 0) {
      console.log(error.error);
      retErrorException = new Error("Código de error: 0. No se ha podido conectar al servidor, compruebe su conexión a internet.");
    } else {
      console.log(error.error);
      retErrorException = new Error(`Ha ocurrido un error inesperado. Código del error: ${error.error.error.status} ${error.error.error.name} - ${error.error.error.message}`)
    }

    return throwError(() => retErrorException);
  }


  public async postUser(user: IUser) {
      /*
      let options: {
        headers?:         HttpHeaders | {[header: string]: string | string[]};
        context?:         HttpContext;
        observe?:         'body' | 'events' | 'response';
        params?:          HttpParams | {[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>};
        reportProgress?:  boolean;
        responseType:    'arraybuffer' | 'blob' | 'json' | 'text';
        withCredentials?: boolean;
      } 
      */

    let resJson = JSON.stringify({data: user});
    let options: { 
      headers?:         HttpHeaders | { [header: string]: string | string[]; }, 
      observe:          'body', 
      context?:         HttpContext, 
      params?:          HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; }, 
      reportProgress?:  boolean, 
      responseType?:    'json', 
      withCredentials?: boolean 
    } = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'body',
      responseType: 'json'
    }

    let request = this.http.post<string>(
      UserLogedService.FULL_API_POST,
      resJson,
      options
    )
      .pipe( catchError(this.httpErrorGenerator) );
    //  .subscribe(data => console.log(data));
      
    lastValueFrom(request)
      .then(
        data  => console.log("Uauario registrado correctamente: " + data),
        error => console.error(error)
      )
      .catch(error => console.error(`No se ha podido conectar al servidor a causa de ${error}.`) );
  }
}
