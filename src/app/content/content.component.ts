import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

    public emailForm: FormGroup;
    public images: Array<any>;
    public showEmail: boolean;
    private EMAILS_REGEX = /^(\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]{2,4}\s*?,?\s*?)+$/;
    private MAX_SUBJECT = 100;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.createForm();
        _.set(this, 'showEmail', false);
        _.set(this, 'images', []);
    }

    private createForm() {
        this.emailForm = this.fb.group({
            to: ['', [Validators.required, Validators.pattern(this.EMAILS_REGEX)]],
            cc: ['', Validators.pattern(this.EMAILS_REGEX)],
            bcc: ['', Validators.pattern(this.EMAILS_REGEX)],
            subject: ['', [Validators.required, Validators.maxLength(this.MAX_SUBJECT)]],
            message: ['', Validators.required]
        });
    }

    public uploadFile(event) {
        _.set(this, 'images', []);
        if (!_.isNil(event.target.files)) {
            _.forEach(event.target.files, (file: any) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e: any) => {
                    this.images.push(e.target.result);
                };
            });
        }
    }

    public removeFile(pos: number) {
        this.images.splice(pos, 1);
    }

    public sendEmail() {
        _.set(this, 'showEmail', true);
    }
}
