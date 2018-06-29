import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, MaxLengthValidator } from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

    public emailForm: FormGroup;
    public images: Array<any>;
    private EMAILS_REGEX = /^(\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]{2,4}\s*?,?\s*?)+$/;
    private MAX_SUBJECT = 100;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.createForm();
        this.images = [];
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
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (e) => {
                this.images.push(e.target.result);
            };
        }
    }

}
