import { ImageModel} from './ImageModel';
import { Observable } from 'rxjs';

// export class ResponseModel extends Observable<any> {
export interface ResponseModel {
    total: number;
    totalHits: number;
    hits: ImageModel[];
}
