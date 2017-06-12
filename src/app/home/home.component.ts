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
  
  languages = ['English', 'Spanish', 'Other'];
  model = new Employee('', '', true, '', 'default');
  hasPrimaryLanguageError = false;

  constructor(private formPoster: FormPosterService){

  }

  submitForm(form: NgForm) {
    console.log(this.model);                      // 1.
    console.log(form.value);                      // 2.
    this.formPoster.postEmployeeForm(this.model); // 3.
  }

  firstNameToUpperCase(value: string){
    if (value.length > 0){
      this.model.firstName = value.charAt(0).toUpperCase() + value.slice(1);
    }
    else{
      this.model.firstName = value;
    }
  }
}
