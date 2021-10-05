import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dolce } from 'src/app/common/dolce';
import { Ingrediente } from 'src/app/common/ingrediente';
import { DolceService } from 'src/app/services/dolce.service';
import { FileService } from 'src/app/services/file.service';
import { IngredienteService } from 'src/app/services/ingrediente.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  dolce: Dolce = new Dolce();
  dolceFormGroup!: FormGroup;
  dropdownList = [];
  dropdownSettings: any = {};
  selectedIngredienti: Ingrediente[] = [];
  selectedIngrediente!: Ingrediente;
  ingredienti: Ingrediente[] = [];
  closeDropdownSelection = false;
  selectedFile!: File;

  constructor(private formBuilder: FormBuilder, private dolceService: DolceService, private route: ActivatedRoute, private router: Router, private fileService: FileService, private ingredienteService: IngredienteService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      () => {
        this.getDolceDetail();
        this.findAllIngredienti();
      }
    );

    this.dolceFormGroup = this.formBuilder.group({
      dolce: this.formBuilder.group({
        nome: [''],
        descrizione: [''],
        prezzo: [''],
        calorie: [''],
        file: [''],
        ingredienti: [''],
        imageUrl: [''],
        imgName: []


      }),
      ingrediente: this.formBuilder.group({
        nome: ['']
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

  getDolceDetail() {
    const id: any = this.route.snapshot.paramMap.get('id');
    this.dolceService.findById(id).subscribe(
      data => {
        this.dolce = data;
        this.selectedIngredienti = this.dolce.ingredienti;
        console.log(this.dolce)
        this.getImg(this.dolce);
        this.dolceFormGroup.patchValue({
          dolce: this.dolce
        });
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

  findAllIngredienti() {
    this.ingredienteService.findAll().subscribe(
      data => {
        this.ingredienti = data;
      }
    )
  }

  onFileSelected(event: any){
    console.log("file uploaded", event);
    this.selectedFile = <File>event.target.files[0]; 
    this.dolce.imgName = this.selectedFile.name;
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  onSubmit(){
    console.log(this.dolceFormGroup.value);
    console.log(this.dolceFormGroup.get('dolce')!.value);
    //this.dolce.imgName = this.selectedFile.name;
    console.log("onSubmit ", this.dolceFormGroup.value);
    if(this.selectedFile){
      this.uploadFile();
    }
    this.dolceService.update(this.dolce.id, this.dolceFormGroup.get('dolce')!.value).subscribe({
      next: (response: any) => {
        alert('Dolce aggiornato!');
        this.router.navigate(['dolci']);
      },
      error: (err: { message: any; }) => {
        alert(`There was an error: ${err.message}`);
      }
    }
  );
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

}
