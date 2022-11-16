import { Component, OnInit } from '@angular/core';
import { MitarbeiterService } from 'src/app/service/mitarbeiter.service';

@Component({
  selector: 'app-my-zeiterfassung',
  templateUrl: './my-zeiterfassung.component.html',
  styleUrls: ['./my-zeiterfassung.component.css']
})
export class MyZeiterfassungComponent implements OnInit {

  constructor(private mitarbeiterService: MitarbeiterService) { }

  ngOnInit(): void {
  }

  getAusleihungen() {
    
  }

}
