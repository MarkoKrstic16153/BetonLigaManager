import { Injectable } from '@angular/core';
import { QueryRef, Apollo } from 'apollo-angular';
import { Igrac } from '../models/Igrac';
import gql from 'graphql-tag';
import { variable } from '@angular/compiler/src/output/output_ast';

@Injectable({providedIn: 'root'})
export class IgracService {
    query: QueryRef<any>; 

    constructor(private apollo: Apollo) { 

    }
    addIgrac(noviIgrac:Igrac,tim:string):any{
        let ADD_IGRAC = gql`
        mutation dodajIgraca(
            $ime:String!,
            $prezime:String!,
            $brojDresa:String!,
            $godRodjenja:String!,
            $brojTelefona:String!,
            $pozicija:String!,
            $opis:String!
        ){ 
            CreateIgrac(
                ime: $ime,
                prezime: $prezime,
                brojDresa: $brojDresa,
                godRodjenja: $godRodjenja,
                brojTelefona: $brojTelefona,
                pozicija: $pozicija,
                opis: $opis
            ){
                ime
            }
        }`;
        return this.apollo.mutate({
            mutation:ADD_IGRAC,
            variables:{
                ime:noviIgrac.ime,
                prezime:noviIgrac.prezime,
                brojDresa:noviIgrac.brojDresa,
                godRodjenja:noviIgrac.godRodjenja,
                brojTelefona:noviIgrac.brojTelefona,
                pozicija:noviIgrac.pozicija,
                opis:noviIgrac.opis,
            }
        });
    }
}