import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { SnackbarService } from '../snackbarservice';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})

export class CreateuserComponent implements OnInit {
  userslist: any;
  confirmpassowrderr: boolean;
  id: string;
  editvalue: any;
  formSubmitted: boolean;
  creationForm: FormGroup;
  namePattern = '^[A-Za-z\s]{2,35}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  countrylist: Array<any> = [
    { name: 'India', value: 'India' },
    { name: 'USA', value: 'USA' },
    { name: 'England', value: 'England' }
  ];

  constructor(private formBuilder: FormBuilder, private userservice: UsersService,
              private snackBar: SnackbarService, private activatedRoute: ActivatedRoute, private router: Router) { }




  ngOnInit() {

    if (this.router.url.includes('edit')) {
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.userslist = JSON.parse(localStorage.getItem('users') || '[]');
      this.editvalue = this.userslist[this.id];
      this.confirmpassowrderr = false;
      this.creationForm = this.formBuilder.group({
        name: [this.editvalue.name, Validators.required],
        email: [this.editvalue.email, Validators.required],
        password: [this.editvalue.password, Validators.required],
        confirmPassword: [this.editvalue.confirmPassword, Validators.required],
        country: [this.editvalue.country, Validators.required],
        gender: [this.editvalue.gender, [Validators.required]],
      });
    }
    else {
      this.creationForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.pattern(this.namePattern)]],
        email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        country: ['', [Validators.required]],
        gender: ['male', [Validators.required]],
      });
    }

  }


  createuser(userform) {
    this.formSubmitted = true;
    if (userform.valid && this.confirmpassowrderr === false) {
      this.formSubmitted = false;
      if (this.id) {
        this.userslist.forEach(element => {
          if (this.userslist.indexOf(element) === this.id) {
            this.userslist[this.id] = userform.value;
            localStorage.setItem('users', JSON.stringify(this.userslist));
            this.snackBar.open('User Updated Successfully');
          }
        });
      }
      else {
        this.userslist = JSON.parse(localStorage.getItem('users') || '[]');
        this.userslist.push(userform.value);
        localStorage.setItem('users', JSON.stringify(this.userslist));
        this.snackBar.open('User Added Successfully');

      }
      this.router.navigate(['']);
    }

  }

  checkpassword() {
    if (this.creationForm.value.password !== this.creationForm.value.confirmPassword) {
      this.confirmpassowrderr = true;
    } else {
      this.confirmpassowrderr = false;
    }
  }


}
