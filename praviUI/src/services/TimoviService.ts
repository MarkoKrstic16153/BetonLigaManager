import { Injectable } from "@angular/core";
import gql from "graphql-tag";
import { Apollo, QueryRef } from "apollo-angular";
import { Tim } from "../models/Tim";

@Injectable({ providedIn: "root" })
export class TimoviService {
  query: QueryRef<any>;
  constructor(private apollo: Apollo) {}
  getAllTimovi(): any {
    const GET_TIMOVI_QUERY = gql`
      query {
        Tim {
          naziv
        }
      }
    `;
    this.query = this.apollo.watchQuery({
      query: GET_TIMOVI_QUERY,
      variables: {}
    });
    return this.query.valueChanges;
  }
  createTim(noviTim: Tim): any {
    let CREATE_TIM = gql`
      mutation CREATE_TIM($nazivTima: String!, $opis: String!) {
        CreateTim(
          naziv: $nazivTima
          opis: $opis
          postignutiGolovi: 0
          primljeniGolovi: 0
          brojPobeda: 0
          brojPoraza: 0
          brojPoenaTabela: 0
          nereseno: 0
        ) {
          naziv
          opis
        }
      }
    `;
    return this.apollo.mutate({
      mutation: CREATE_TIM,
      variables: {
        naziv: noviTim.naziv,
        opis: noviTim.opis
      }
    });
  }
  getTim(nazivTima: String): any {
    let GET_TIM = gql`
      query GET_TIM($nazivTima: String) {
        Tim(filter: { naziv_contains: $nazivTima }) {
          naziv
          opis
          postignutiGolovi
          primljeniGolovi
          brojPobeda
          brojPoraza
          nereseno
        }
      }
    `;
    this.query = this.apollo.watchQuery({
      query: GET_TIM,
      variables: {
        nazivTima
      }
    });
    return this.query.valueChanges;
  }

  updateTim(Tim: Tim): any {
    let UPDATE_TIM = gql`
      mutation UPDATE_TIM(
        $nazivTima: String!
        $postignutiGolovi: Int
        $primljeniGolovi: Int
        $brojPobeda: Int
        $brojPoraza: Int
        $nereseno: Int
        $brojPoenaTabela: Int
      ) {
        UpdateTim(
          naziv: $nazivTima
          postignutiGolovi: $postignutiGolovi
          primljeniGolovi: $primljeniGolovi
          brojPobeda: $brojPobeda
          brojPoraza: $brojPoraza
          nereseno: $nereseno
          brojPoenaTabela: $brojPoenaTabela
        ) {
          naziv
          postignutiGolovi
          primljeniGolovi
          brojPobeda
          brojPoraza
          nereseno
          brojPoenaTabela
        }
      }
    `;
    return this.apollo.mutate({
      mutation: UPDATE_TIM,
      variables: {
        nazivTima: Tim.naziv,
        postignutiGolovi: Tim.postignutiGolovi,
        primljeniGolovi: Tim.primljeniGolovi,
        brojPobeda: Tim.brojPobeda,
        brojPoraza: Tim.brojPoraza,
        nereseno: Tim.nereseno,
        brojPoenaTabela: Tim.brojPoenaTabela
      }
    });
  }
  getSortTimovi(): any {
    const GET_ALL_TEAMS_SORT_POINTS = gql`
      query {
        Tim(orderBy: brojPoenaTabela_desc) {
          naziv
          brojPoenaTabela
          brojPobeda
          nereseno
          brojPoraza
          postignutiGolovi
          primljeniGolovi
        }
      }
    `;
    this.query = this.apollo.watchQuery({
      query: GET_ALL_TEAMS_SORT_POINTS,
      variables: {}
    });
    return this.query.valueChanges;
  }
  addTimLiga(nazivTima: String, nazivLige: String): any {
    const ADD_TIM_LIGA = gql`
        mutation AddTimLiga(from:{naziv:$nazivTima},to:{naziv:$nazivLige})
            {
                from{
                naziv
                }
                to{
                naziv
                }
            }`;
    return this.apollo.mutate({
      mutation: ADD_TIM_LIGA,
      variables: {
        nazivTima: nazivTima,
        nazivLige: nazivLige
      }
    });
  }
}