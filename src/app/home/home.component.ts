import { Component } from '@angular/core';
import { Employee } from '../models/employee.model';
import { FormPosterService } from '../services/form-poster.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  //languages : string[];
  
  //languages = ['English', 'Spanish', 'Other'];

  languages = [];
  model = new Employee('', '', true, '', 'default');
  hasPrimaryLanguageError = false;

  constructor(private formPoster: FormPosterService){
    this.formPoster.getLanguages()
      .subscribe(
        data => this.languages = data.languages,
        err => console.log('get error: ', err)
      );
  }

  submitForm(form: NgForm) {
    //console.log(this.model);                      // 1.
    //console.log(form.value);                      // 2.
    this.validatePrimaryLanguage(this.model.primaryLanguage);
    if (this.hasPrimaryLanguageError)
       return;
    //this.formPoster.postEmployeeForm(this.model); // 3.
    
    this.formPoster.postEmployeeForm(this.model)
      .subscribe(
        data => console.log('success: ', data),
        err => console.log('error: ', err)
      )
  }

  firstNameToUpperCase(value: string){
    if (value.length > 0){
      this.model.firstName = value.charAt(0).toUpperCase() + value.slice(1);
    }
    else{
      this.model.firstName = value;
    }
  }

  validatePrimaryLanguage(value) {
    if (value == 'default')
      this.hasPrimaryLanguageError = true;
    else
      this.hasPrimaryLanguageError = false;
  }
}
