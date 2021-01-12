import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { SnackbarService } from '../snackbarservice';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit, AfterViewInit  {

  displayedColumns = ['name', 'email', 'gender', 'Actions'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  rows = [];
  users = [
    {
      name: 'Ram', email: 'ram@gmail.com', gender: 'male',
      password: 'Dell@123', confirmPassword: 'Dell@123', country: 'India'
    },
    {
      name: 'Shyam', email: 'sh@gmail.com', gender: 'male',
      password: 'Dell@123', confirmPassword: 'Dell@123', country: 'England'
    },
    {
      name: 'Mohan', email: 'moh@live.in', gender: 'male',
      password: 'Dell@123', confirmPassword: 'Dell@123', country: 'England'
    },
    {
      name: 'Rohan', email: 'rohan@gmail.com', gender: 'male',
      password: 'Dell@123', confirmPassword: 'Dell@123', country: 'England'
    },
    {
      name: 'Sumit', email: 'sumit@live.in', gender: 'male',
      password: 'Dell@123', confirmPassword: 'Dell@123', country: 'England'
    }
  ];
  userslist: any;

  constructor(private userservice: UsersService, private snackBar: SnackbarService, public router: Router) { }



  ngOnInit() {
    this.userslist = this.userservice.getusers();
    this.dataSource = new MatTableDataSource(this.userslist);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // to  get users
  getusers() {

    if (this.userslist.length === 0) {
      this.userservice.setusers(this.users);
      this.ngOnInit();
    }

  }

  // to  delete user
  delete(user) {
    this.userservice.userdelete(user).subscribe((data: any) => {
      this.getusers();
      this.snackBar.open('User Deleted Successfully');
    });
    this.ngAfterViewInit();
  }

  // to  add
  add() {
    this.router.navigate(['/create']);
  }

  // to  edit
  edit(user) {
    const index = this.userslist.indexOf(user);
    this.router.navigate(['/edit/' + index]);
  }

}
