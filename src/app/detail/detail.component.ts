import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { ListService } from '../list.service';
import {ImageModel} from '../models/ImageModel';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

    nImageId: number;
    objImage: ImageModel = new ImageModel();

    constructor(private route: ActivatedRoute, private imageService: ListService) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.nImageId = params.nImageId;
        });

        const objImage = this.imageService.getImageById(this.nImageId);

        if (objImage) {
            // If we have the image in the service, replace the local objImage with the one from the service
            this.objImage = objImage;
        } else {
            // If we don't have the image in the service, we ask the service to fetch it again
            this
                .imageService
                .fetchImageById(this.nImageId)
                .subscribe(objResponse => {
                    if (objResponse.hits && objResponse.hits[0]) {
                        this.objImage = objResponse.hits[0];
                    }
                });
        }
    }

}
