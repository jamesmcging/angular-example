import { ImageModel} from './ImageModel';
import {Observable} from 'rxjs';

export class ResponseModel extends Observable<any> {
    total: number;
    totalHits: number;
    hits: ImageModel[];
}
