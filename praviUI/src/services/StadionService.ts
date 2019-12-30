import { Injectable } from "@angular/core";
import { QueryRef, Apollo } from "apollo-angular";
import { Stadion } from "src/models/Stadion";
import gql from "graphql-tag";

@Injectable({ providedIn: "root" })
export class StadionService {
  query: QueryRef<any>;
  constructor(private apollo: Apollo) {}
  createStadion(noviStadion: Stadion): any {
    let CREATE_STADION = gql`
      mutation napraviStadion($nazivStadiona: String!,$kapacitet: Int!,$adresa: String!,$opisStadiona: String!){
        CreateStadion(naziv: $nazivStadiona,kapacitet: $kapacitet,adresa: $adresa,opis: $opisStadiona){
          naziv
        }
      }`;
    return this.apollo.mutate({
      mutation: CREATE_STADION,
      variables: {
        naziv: noviStadion.naziv,
        kapacitet: noviStadion.kapacitet,
        adresa: noviStadion.adresa,
        opis: noviStadion.opis
      }
    });
  }
  getStadion(nazivStadiona: String): any {
    let GET_STADION = gql`
      query GET_STADION($nazivStadiona: String) {
        Stadion(filter: { naziv_contains: $nazivStadiona }) {
          naziv
          kapacitet
          adresa
        }
      }
    `;
    this.query = this.apollo.watchQuery({
      query: GET_STADION,
      variables: {
        nazivStadiona: nazivStadiona
      }
    });
    return this.query.valueChanges;
  }
  topKapacitet(): any {
    let TOP_KAPACITET_STADION = gql`
      query TOP_KAPACITET_STADION {
        Stadion(first: 3, orderBy: kapacitet_desc) {
          naziv
          kapacitet
        }
      }
    `;
    return this.apollo.watchQuery({
      query: TOP_KAPACITET_STADION,
      variables: {}
    });
  }
  addStadionTim(nazivTima: String, nazivStadiona: String): any {
    const ADD_STADION_TIM = gql`
            mutation ADD_STADION_TIM($nazivTima: String!, $nazivStadiona: String!)
            { AddStadionTim(from:{naziv:$nazivTima},to:{naziv:$nazivStadiona})
            {
                from{
                        naziv
                },
                to{
                    naziv,
                    kapacitet  
                }
            } 
            }`;
    return this.apollo.mutate({
      mutation: ADD_STADION_TIM,
      variables: {
        nazivTima: nazivTima,
        nazivSTADIONA: nazivStadiona
      }
    });
  }
  getStadionUtakmice(): any {
    const GET_STADION_UTAKMICE = gql`
        query query GET_STADION_UTAKMICE{
            Stadion{
                naziv,
                utakmica{
                Utakmica{
                    datum,
                    vreme
                }
                }
            }
        }`;
    return this.apollo.watchQuery({
      query: GET_STADION_UTAKMICE,
      variables: {}
    });
  }
}
