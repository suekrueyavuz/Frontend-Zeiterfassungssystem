import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Firma } from 'src/app/model/firma';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-alle-firmen',
  templateUrl: './alle-firmen.component.html',
  styleUrls: ['./alle-firmen.component.css'],
  providers: [ConfirmationService]
})
export class AlleFirmenComponent implements OnInit {
  allFirma: Firma[] = [];
  selectedFirma?: Firma;

  cols: any[] = [];

  constructor(private adminService: AdminService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getAllFirma();

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'username', header: 'Username' },
      { field: 'name', header: 'Name' }
    ];
  }

  getAllFirma() {
    this.adminService.getAllFirma().subscribe(data => {
      this.allFirma = data;
    })
  }

  reportRunterladen() {
    this.adminService.reportRunterladen(this.selectedFirma).subscribe((response) => {
      var contentDisposition = response.headers.get('content-disposition');
      var filename = contentDisposition?.split(';')[1].split('filename')[1].split('=')[1].trim();
      let blob: Blob = response.body as Blob;
      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = filename || 'report.xlsx';
      link.click();
    })
  }

  firmaLoeschen() {
    this.confirmationService.confirm({
      header: 'Firma löschen',
      message: 'Möchten Sie die Firma löschen?',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.adminService.deleteFirma(this.selectedFirma).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

  resetPassword() {
    this.confirmationService.confirm({
      header: 'Passwort zurücksetzen',
      message: 'Möchten Sie das Passwort zurücksetzen?',
      icon: 'pi pi-info-circle',
      accept: () => {
        if(this.selectedFirma?.id) {
        this.adminService.resetFirmaPassword(this.selectedFirma.id).subscribe();
        }
      }
    });
  }

}
