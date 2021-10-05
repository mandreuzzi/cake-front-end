import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { DolceService } from 'src/app/services/dolce.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(private dolceService: DolceService, private route: ActivatedRoute, private router: Router, private oktaAuthService: OktaAuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      () => {
        this.deleteDolce();
      }
    );
  }

  deleteDolce() {
    const id: any = this.route.snapshot.paramMap.get('id');
    this.dolceService.delete(id).subscribe(
      () => {
        this.router.navigate(['dolci']);
      }
    );
  }

}
