import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { Dolce } from 'src/app/common/dolce';
import { DolceService } from 'src/app/services/dolce.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-dettaglio-dolci',
  templateUrl: './dettaglio-dolci.component.html',
  styleUrls: ['./dettaglio-dolci.component.css']
})
export class DettaglioDolciComponent implements OnInit {

  dolce: Dolce = new Dolce;
  isAuthenticated: boolean = false;
  
  constructor(private dolceService: DolceService, private route: ActivatedRoute, private oktaAuthService: OktaAuthService, private fileService: FileService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      () => {
        this.getDolceDetail();
      }
    );

    // Subscribe to authentication state changes
    this.oktaAuthService.$authenticationState.subscribe(
    (result: boolean) => {
      this.isAuthenticated = result;
      }
    );
    this.oktaAuthService.isAuthenticated().then(
    value => {
      this.isAuthenticated = value;
      }
    );
  }

  getDolceDetail() {
    const id: any = this.route.snapshot.paramMap.get('id');
    this.dolceService.findById(id).subscribe(
      data => {
        this.dolce = data;
        this.getImg(this.dolce);
      }
    );
  }

  getImg(dolce: Dolce){
      this.fileService.download(dolce.imgName).subscribe(
        (data: Blob) => {
          var reader = new FileReader ();
          reader.readAsDataURL(data)
          reader.onload = (_event) => {
          dolce.imgToShow = reader.result;
          }
        }
      );
  }
}
