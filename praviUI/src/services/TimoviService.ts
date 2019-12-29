import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo, QueryRef } from 'apollo-angular';
import { Tim } from '../models/Tim';

@Injectable({providedIn: 'root'})
export class TimoviService {
    query: QueryRef<any>; 
    constructor(private apollo: Apollo) { }
    getAllTimovi():any{
        const GET_TIMOVI_QUERY = gql`
            query {
            Tim {
                 naziv
                 }
            }`;
        this.query = this.apollo.watchQuery({
            query: GET_TIMOVI_QUERY,
            variables: {}
          });
      return this.query.valueChanges;  
    }
    postTim(noviTim:Tim){

    }
    
}