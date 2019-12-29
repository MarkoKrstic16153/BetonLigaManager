import { Injectable } from '@angular/core';
import { QueryRef, Apollo } from 'apollo-angular';

@Injectable({providedIn: 'root'})
export class UtakmicaService {
    query: QueryRef<any>; 
    constructor(private apollo: Apollo) { }
    
}