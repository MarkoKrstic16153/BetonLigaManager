import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-smart-search-bar',
  templateUrl: './smart-search-bar.component.html',
  styleUrls: ['./smart-search-bar.component.css']
})
export class SmartSearchBarComponent implements OnInit {

  @Input() titlePretrage:string;
  @Input() modPretrage:string;
  @Input() obsPretrage:Observable<any>;
  @Output() onEnter: EventEmitter<any> = new EventEmitter<any>();

  myControl = new FormControl();
  allPodaci:any[]=[];
  filtriraniPodaci: Observable<any>;
  
  constructor(private router: Router) { }

  async ngOnInit() {
      switch(this.modPretrage) { 
        case 'brojdresaigraca': { 
          break; 
        } 
        case 'timigraca': { 
          this.subskrajbujSeNaUlaznePodatke();
          break; 
        } 
        case 'imestadiona': { 
          break; 
        } 
        case 'imetimstadiona': { 
          this.subskrajbujSeNaUlaznePodatke();
          break; 
        } 
        case 'imetima': { 
          this.subskrajbujSeNaUlaznePodatke();
          break; 
        } 
        case 'imetimautakmice': { 
          this.subskrajbujSeNaUlaznePodatke();
          break; 
        }
        case 'imedomacinautakmice': { 
          this.subskrajbujSeNaUlaznePodatke();
          break; 
        } 
        case 'imegostautakmice': { 
          this.subskrajbujSeNaUlaznePodatke();
          break; 
        }  
        default: { 
           console.log("Cudni Mod.");
           break; 
        } 
     } 
  }

  subskrajbujSeNaUlaznePodatke(){
    this.obsPretrage.subscribe(podaci=>{
      this.allPodaci=podaci.data.Tim;
      console.log(this.allPodaci);
    });
    this.filtriraniPodaci = this.myControl.valueChanges
    .pipe(
      startWith('/[a-zA-Z]/'),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if(this.allPodaci[0] && this.allPodaci[0].naziv)
    {
      if(value.length>2)
        return this.allPodaci.filter(podatak =>podatak.naziv.toLowerCase().includes(filterValue));
    }
    else if(this.allPodaci[0] && this.allPodaci[0].ime)
    {
      console.log("ima ime");
      if(value.length>2)
        return this.allPodaci.filter(podatak => podatak.ime.toLowerCase().includes(filterValue));
    }
    else {
      console.log("nema nista.");
      if(value.length>2){
        console.log(this.allPodaci);
        return this.allPodaci.filter(podatak => podatak.toLowerCase().includes(filterValue));
      }
    }
  }
  prikaz(podatak){///sta prikazuje;
    console.log(podatak);
    switch(this.modPretrage) { 
      case 'brojdresaigraca': { 
        break; 
      } 
      case 'timigraca': { 
        return podatak.naziv;
      } 
      case 'imestadiona': { 
        break; 
      } 
      case 'imetimstadiona': { 
        return podatak.naziv;
        break; 
      } 
      case 'imetima': { 
        
        break; 
      } 
      case 'imetimautakmice': { 
        break; 
      }
      case 'imedomacinautakmice': { 
        break; 
      } 
      case 'imegostautakmice': { 
        break; 
      }  
      default: { 
         console.log("Cudni Mod.");
         break; 
      } 
   } 
  }
  pretraziTrenutno(){
      this.onEnter.emit(this.myControl.value);
  }
}
