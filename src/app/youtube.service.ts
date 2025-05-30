import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

    private apiUrl = 'http://127.0.0.1:8000/api/analyze/';

  constructor(private http: HttpClient) {}

  // scrapeComments(url: string): Observable<any> {
  //   return this.http.post(this.apiUrl, { url: url });
  // }

   scrapeComments(url: string, maxComments: number = 100): Observable<any> {
    const body = {
      url: url,
      max_comments: maxComments
    };

    return this.http.post(this.apiUrl, body);
  }
}
