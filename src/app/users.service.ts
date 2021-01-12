import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  userslist: any;

  constructor() { }

  getusers(){
    this.userslist = JSON.parse(localStorage.getItem('users') || '[]');
    return this.userslist;
  }

  userdelete(user) {
    const index = this.userslist.indexOf(user);
    this.userslist.splice(index, 1);
    this.setusers(this.userslist);
    return this.userslist;
  }

  setusers(userslist){
    localStorage.setItem('users', JSON.stringify(userslist));
  }


}
