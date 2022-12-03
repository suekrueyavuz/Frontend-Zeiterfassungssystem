import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-alle-mitarbeiter',
  templateUrl: './alle-mitarbeiter.component.html',
  styleUrls: ['./alle-mitarbeiter.component.css']
})
export class AlleMitarbeiterComponent implements OnInit {
  allMitarbeiter: User[] = [];
  selectedMitarbeiter?: User;

  cols: any[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllMitarbeiter();

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'username', header: 'Username' },
      { field: 'forename', header: 'Vorname' },
      { field: 'surname', header: 'Nachname' },
      { field: 'role', header: 'Rolle' }
    ];
  }

  getAllMitarbeiter() {
    this.adminService.getAllMitarbeiter().subscribe(data => {
      this.allMitarbeiter = data;
    })
  }

  scroll() {
    let changeMitarbeiterDiv = document.getElementById('changeMitarbeiter');
    if(changeMitarbeiterDiv) {
      changeMitarbeiterDiv.scrollIntoView();
      return;
    }
    let observer = new MutationObserver((mutations) => {
      mutations.forEach(function (mutation) {
        let nodes = Array.from(mutation.addedNodes);
        for (var node of nodes) {
          if(node.contains(document.getElementById('changeMitarbeiter'))) {
            document.getElementById('changeMitarbeiter')?.scrollIntoView();
            observer.disconnect();
          }
        }
      })
    })
    
    observer.observe(document.body, {
        childList: true
      , subtree: true
      , attributes: false
      , characterData: false
    })
  }
}
