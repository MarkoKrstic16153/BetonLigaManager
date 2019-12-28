import { Injectable } from '@angular/core';
import { Observable } from 'apollo-link';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import { Apollo, QueryRef } from 'apollo-angular';

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
    
}