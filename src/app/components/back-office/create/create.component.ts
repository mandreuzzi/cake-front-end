import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Dolce } from 'src/app/common/dolce';
import { Ingrediente } from 'src/app/common/ingrediente';
import { DolceService } from 'src/app/services/dolce.service';
import { FileService } from 'src/app/services/file.service';
import { IngredienteService } from 'src/app/services/ingrediente.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  
  dolce: Dolce = new Dolce();
  dolceFormGroup!: FormGroup;
  dropdownList = [];
  ingredienti: Ingrediente[] = [];
  selectedIngredienti: Ingrediente[] = [];
  selectedIngrediente!: Ingrediente;
  dropdownSettings: any = {};
  closeDropdownSelection = false;
  selectedFile!: File;
  
  constructor(private formBuilder: FormBuilder, private ingredienteService: IngredienteService, private httpClient: HttpClient, private fileService: FileService, private dolceService: DolceService, private router: Router) { }

  ngOnInit(): void {
    this.findAllIngredienti();
    this.dolceFormGroup = this.formBuilder.group({
      dolce: this.formBuilder.group({
        nome: [''],
        prezzo: [''],
        descrizione: [''],
        imageUrl: [''],
        scaduto: [''],
        unitaDisponibili: [''],
        calorie: [''],
        dataCreazione: [''],
        ingredienti: [''],
        file: [''],
        imgName: ['']
      }),
      ingrediente: this.formBuilder.group({
        nome: [''],
      })
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nome',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }

  findAllIngredienti() {
    this.ingredienteService.findAll().subscribe(
      data => {
        this.ingredienti = data;
      }
    )
  }

  onSubmit() {
    console.log("", this.dolceFormGroup.get('dolce')!.value);
    this.dolce = this.dolceFormGroup.get('dolce')!.value;
    if(this.selectedFile){
      this.dolce.imgName = this.selectedFile.name;
    }
    console.log("onSubmit ", this.dolce);
    if(this.selectedFile){
      this.uploadFile();
    }
    this.dolceService.create(this.dolce).subscribe({
      next: (response: any) => {
        alert('Dolce Creato!');
        this.router.navigate(['dolci']);
      },
      error: (err: { message: any; }) => {
        alert(`Error: ${err.message}`);
      }
    }
  );
  }

  onIngredienteSelect(ingrediente: any) {
    console.log('onIngredienteSelect', ingrediente);
  }

  toggleCloseDropdownSelection() {
    this.closeDropdownSelection = !this.closeDropdownSelection;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { closeDropDownOnSelection: this.closeDropdownSelection });
  }

  handleReset() {
    this.selectedIngredienti = [];
  }

  onFileSelected(event: any){
    console.log("file uploaded", event);
    this.selectedFile = <File>event.target.files[0]; 
    this.dolceFormGroup.patchValue({
      imgName: this.selectedFile.name
    });
  }

  uploadFile(){
    const fileData = new FormData();
    fileData.append('image', this.selectedFile, this.selectedFile.name);
    this.fileService.upload(fileData).subscribe(
      (res: any) => {
        console.log(res);
      }
    )   
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }
 
}
