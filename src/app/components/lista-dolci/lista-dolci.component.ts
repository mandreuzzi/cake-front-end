import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { Dolce } from 'src/app/common/dolce';
import { DolceService } from 'src/app/services/dolce.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-lista-dolci',
  templateUrl: './lista-dolci-grid.component.html',
  styleUrls: ['./lista-dolci.component.css']
})
export class ListaDolciComponent implements OnInit {

  isAuthenticated: boolean = false;
  dolci: Dolce[] = [];
  searchMode: boolean = false;
  imageToShow: any;

  constructor(private dolceService: DolceService, private route: ActivatedRoute, private oktaAuthService: OktaAuthService, private fileService: FileService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.searchMode = params['keyword'];
        this.getListaDolci();
      }
    );
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

  getListaDolci(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.searchDolci();
    }
    else {
      this.findAllDolci();
    }
  }

  findAllDolci() {
    this.dolceService.findAll().subscribe(
      data => {
        this.dolci = data;
        this.dolci.forEach(dolce => this.getImg(dolce))
        this.checkDataDolce();
      }
    )
  }

  searchDolci() {
    const theKeyword: any = this.route.snapshot.paramMap.get('keyword');
    this.dolceService.findByName(theKeyword).subscribe(
      data => {
        this.dolci = data;
        this.dolci.forEach(dolce => this.getImg(dolce))
        this.checkDataDolce();
      }
    )
  }

  checkDataDolce(): void{
    this.dolci.filter((d) => {
      if(this.dolceService.calcDiffDay(d.dataCreazione) > 3){
        let index: number = this.dolci.indexOf(d);
        this.dolci.splice(index, 1);
      }; 
    });
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
