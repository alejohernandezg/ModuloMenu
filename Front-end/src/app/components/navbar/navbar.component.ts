import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuiTabsModule } from 'ng2-semantic-ui';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public selectHome: number = 1;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  changeNavbar(num: number) {
    this.selectHome = num;
  }

}
