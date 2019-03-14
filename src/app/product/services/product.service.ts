import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError, timer} from 'rxjs';
import {catchError, map, mergeMap, retryWhen} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProductDetails(id): Observable<object> {
    const targetUrl = 'http://localhost:5000/product-details/' + id;
    const retryCount = 3;
    const retryDelay = 2000;

    return this.http.get(targetUrl).pipe(
      map((response: { id: string, details: string[] }) => {
        return response.details;
      }),
      retryWhen((errors: Observable<any>) => {
        let retries = 0;
        return errors.pipe(
          mergeMap((error) => {
            if (retries < retryCount) {
              retries++;
              return timer(retryDelay);
            } else {
              return throwError(error);
            }
          })
        );
      }),
      catchError((error) => {
        console.warn('Http call failed:' + targetUrl + ' Error: ' + error);
        return of([]); // return an empty array instead of an error
      })
    );
  }
}
