import { Ingrediente } from "./ingrediente";

export class Dolce {
    
    id!: number;
    nome!: string;
    prezzo!: number;
    descrizione!: string;
    imageUrl!: string;
    scaduto!: boolean;
    unitaDisponibili!: number;
    calorie!: number;
    dataCreazione!: Date;
    ingredienti: Ingrediente[] = [];
    imgName!: string;
    imgToShow!: any;
    
}
