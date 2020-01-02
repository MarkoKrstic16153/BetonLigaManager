import { Injectable } from "@angular/core";
import { QueryRef, Apollo } from "apollo-angular";
import { Stadion } from "src/models/Stadion";
import gql from "graphql-tag";
import { Observable } from 'apollo-link';

@Injectable({ providedIn: "root" })
export class StadionService {
  query: QueryRef<any>;
  constructor(private apollo: Apollo) {}
  createStadion(noviStadion: Stadion) {
    let CREATE_STADION = gql`
      mutation ($nazivStadiona:String!,$kapacitet:Int!,$adresa:String!,$opisStadiona:String!){
        CreateStadion(naziv:$nazivStadiona,kapacitet:$kapacitet,adresa:$adresa,opis:$opisStadiona){
          naziv
        }
      }`;
    return this.apollo.mutate({
      mutation: CREATE_STADION,
      variables: {
        nazivStadiona: noviStadion.naziv,
        kapacitet: noviStadion.kapacitet,
        adresa: noviStadion.adresa,
        opisStadiona: noviStadion.opis
      }
    });
  }
  getStadion(nazivStadiona: String) {
    let GET_STADION = gql`
      query GET_STADION($nazivStadiona: String) {
        Stadion(filter: { naziv_contains: $nazivStadiona }) {
          naziv,
          kapacitet,
          adresa,
          opis,
          tim{
            Tim{
              naziv
            }
          }
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
  topKapacitet() {
    let TOP_KAPACITET_STADION = gql`
      query TOP_KAPACITET_STADION {
        Stadion(first: 3, orderBy: kapacitet_desc) {
          naziv
          kapacitet
        }
      }
    `;
    this.query= this.apollo.watchQuery({
      query: TOP_KAPACITET_STADION,
      variables: {}
    });
    return this.query.valueChanges;
  }
  addStadionTim(nazivTima: String, nazivStadiona: String) {
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
        nazivStadiona: nazivStadiona
      }
    });
  }
  getStadionUtakmice() {
    const GET_STADION_UTAKMICE = gql`
        query GET_STADION_UTAKMICE{
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
    this.query= this.apollo.watchQuery({
      query: GET_STADION_UTAKMICE
    });
    return this.query.valueChanges;
  }
  getStadionStartsWith(word:String){
    let GET_STADION_STARTS_WITH=gql`
    query GET_STADION_STARTS_WITH($word:String!){
      Stadion(filter:{naziv_starts_with:$word}){
        naziv,
        kapacitet,
        adresa,
        opis,
        tim{
          Tim{
            naziv
          }
        }
      }
    }`;
    this.query=this.apollo.watchQuery({
      query:GET_STADION_STARTS_WITH,
      variables:{word:word}
    });
    return this.query.valueChanges;
  }
  getTimStadion(nazivTima:String){
    let GET_TIM_STADION=gql`
    query GET_TIM_STADION($nazivTima:String!){
      Tim(filter:{naziv:$nazivTima}){
        naziv,
        stadion{
          Stadion{
            naziv,
            kapacitet,
            adresa,
            opis
          }
        }
      }
    }`;
    this.apollo.watchQuery({
      query:GET_TIM_STADION,
      variables:{
        nazivTima:nazivTima
      }
    })
  }
  getSlicnePoKapacitetu(minKapacitet:Number,maxKapacitet:Number,nazivStadiona?:String){
    let GET_PO_KAPACITETU=gql`
    query GET_PO_KAPACITETU($minKapacitet:Int!,$maxKapacitet:Int!,$nazivStadiona:String){
      Stadion(filter:{kapacitet_gte:$minKapacitet,kapacitet_lte:$maxKapacitet,naziv_not:$nazivStadiona}){
        naziv,
        kapacitet,
        adresa
      }
    }`;
    this.query=this.apollo.watchQuery({
      query:GET_PO_KAPACITETU,
      variables:{
        minKapacitet:minKapacitet,
        maxKapacitet:maxKapacitet,
        nazivStadiona:nazivStadiona
      }
    });
    return this.query.valueChanges;
  }
}
