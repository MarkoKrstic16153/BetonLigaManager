import { Component, OnInit, Input } from '@angular/core';
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
  myControl = new FormControl();
  allPodaci:any[]=[];
  filtriraniPodaci: Observable<any>;
  
  constructor(private router: Router) { }

  async ngOnInit() {
      switch(this.modPretrage) { 
        case 'imeigraca': { 
           break; 
        } 
        case 'brojdresaigraca': { 
          break; 
        } 
        case 'timigraca': { 
          this.subskrajbujSeNaUlaznePodatke();
          break; 
        } 
        case 'pozicijaigraca': { 
          break; 
        } 
        case 'imestadiona': { 
          break; 
        } 
        case 'imetimstadiona': { 
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
        return this.allPodaci.filter(podatak => podatak.naziv.toLowerCase().includes(filterValue));
    }
    else if(this.allPodaci[0] && this.allPodaci[0].ime)
    {
      console.log("ima ime");
      if(value.length>2)
        return this.allPodaci.filter(podatak => podatak.ime.toLowerCase().includes(filterValue));
    }
  }

  pretraziTrenutno(){///TO DO
    this.router.navigate(["pitanje",this.myControl.value]);
  }
}
