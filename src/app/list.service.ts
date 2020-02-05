import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, filter, switchMap, retry, catchError } from 'rxjs/operators';

import { ImageModel } from './models/ImageModel';
import { ResponseModel } from './models/ResponseModel';


@Injectable({
  providedIn: 'root'
})
export class ListService {

    private sApiKey = '6473511-0417f2cad683f1bee54cafe15';
    private sUrl = 'https://pixabay.com/api/';

    arrImages: ImageModel[] = [];

    constructor(private http: HttpClient) {}

    fetchImages(): Observable<ResponseModel> {
        return this
            .http
            .get(`${this.sUrl}/?key=${this.sApiKey}${this.getQuery()}`)
            .pipe(
                retry(3),
                catchError(this.handleError),
                map((objResponse: ResponseModel) => {
                    this.arrImages.push(...objResponse.hits);
                    return objResponse;
                })
            );
    }

    fetchImageById(nImageId: number): Observable<ResponseModel> {
        return this
            .http
            .get(`${this.sUrl}/?key=${this.sApiKey}&id=${nImageId}`)
            .pipe(
                map( (objResponse: ResponseModel) => {
                    this.arrImages.push(...objResponse.hits);
                    return objResponse;
                })
            );
    }

    getImages(): ImageModel[] {
        return this.arrImages;
    }

    getImageById(nImageId): ImageModel {
        return this.arrImages.find(objImage => objImage.id === parseInt(nImageId));
    }

    private getQuery(sColours?: string[]) {

        const arrColours = ['blue grey', 'red brown', 'yellow orange', 'green', 'purple'];

        const arrQueryElements = sColours ? sColours : [arrColours[Math.floor((Math.random() * arrColours.length))]];

        return `&per_page=50&&q=${arrQueryElements.map(sQuery => encodeURIComponent(sQuery)).join('&')}`;
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.log(`Client error occurred: ${error.error.message}`);
        } else {
            console.log(`Server error occurred: (${error.status}) ${error.error}`);
        }

        return throwError('Oo');
    }
}
