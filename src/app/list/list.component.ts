import {Component, HostListener, OnInit} from '@angular/core';
import { ListService } from './../list.service';
import { Observable } from 'rxjs';

import { ImageModel } from '../models/ImageModel';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    arrImages: ImageModel[] = [];

    bFetchingImages = true;

    constructor(private imageService: ListService) {}

    ngOnInit() {
        this.fetchImages();
    }

    /**
     * Turns out that ng templates can't do calculations in their switch statements, this is how I
     * set the size and orientation of images in arrImages.
     */
    getImageSize(nIndex) {
        if (nIndex % 7 === 0) {
            return 1;
        } else if (nIndex % 9 === 0) {
            return 2;
        } else if (nIndex % 11 === 0) {
            return 3;
        } else {
            return 4;
        }
    }

    fetchImages() {
        this.bFetchingImages = true;
        this
            .imageService
            .fetchImages()
            .subscribe(
                ResponseModel => {
                    this.arrImages.push(...ResponseModel.hits);
                    this.bFetchingImages = false;
                },
                error => {
                    console.log(error);
                }
            );
    }

    onScroll(): void {
        if (
            (window.innerHeight + window.scrollY) >= (document.body.offsetHeight * 0.9)
            && !this.bFetchingImages
        ) {
            this.fetchImages();
        }
    }
}
