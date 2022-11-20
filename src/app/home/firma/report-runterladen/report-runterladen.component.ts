import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirmaService } from 'src/app/service/firma.service';

@Component({
  selector: 'app-report-runterladen',
  templateUrl: './report-runterladen.component.html',
  styleUrls: ['./report-runterladen.component.css']
})
export class ReportRunterladenComponent implements OnInit {
  me: any;
  public form:FormGroup;

  constructor(fb:FormBuilder, private firmaService: FirmaService) { 
    this.me = JSON.parse(localStorage.getItem('user') || '{}');

    this.form = fb.group({
      zeitraumVon:[null , Validators.required],
      zeitraumBis:[null, Validators.required]
    })
  }

  ngOnInit(): void {
  }

  reportRunterladen() {
    const zeitraumVon = this.convertDate(this.form.value.zeitraumVon.toLocaleDateString());
    const zeitraumBis = this.convertDate(this.form.value.zeitraumBis.toLocaleDateString());
    this.firmaService.getReportFuerZeitraum(this.me.id, zeitraumVon, zeitraumBis).subscribe((response) => {
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

  convertDate(date:string) {
    return date.substring(6) + '-' + date.substring(3,5) + '-' + date.substring(0,2);
  }

}
