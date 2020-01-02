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
  @Input() obsPretrage:Observable<any>;
  @Output() onEnter: EventEmitter<any> = new EventEmitter<any>();
  myControl = new FormControl();
  allPodaci:any[]=[];
  filtriraniPodaci: Observable<any>;
  
  constructor(private router: Router) { }

  async ngOnInit() {
    this.subskrajbujSeNaUlaznePodatke();
  }

  subskrajbujSeNaUlaznePodatke(){
    this.obsPretrage.subscribe(podaci=>{
      this.allPodaci=podaci.data.Tim;
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
    else {
      if(value.length>2){
        return this.allPodaci.filter(podatak => podatak.toLowerCase().includes(filterValue));
      }
    }
  }

  pretraziTrenutno(){
      this.onEnter.emit(this.myControl.value);
  }
}
