import { Injectable } from "@angular/core";
import { QueryRef, Apollo } from "apollo-angular";
import { Liga } from "src/models/Liga";
import gql from "graphql-tag";

@Injectable({ providedIn: "root" })
export class LigaService {
  query: QueryRef<any>;
  constructor(private apollo: Apollo) {}
  addLiga(novaLiga: Liga) {
    let CREATE_LIGA = gql`
      mutation napraviTim($nazivTima: String!, $opis: String!) {
        CreateLiga(naziv: $nazivTima, opis: $opis) {
          naziv
          opis
        }
      }
    `;
    return this.apollo.mutate({
      mutation: CREATE_LIGA,
      variables: {
        nazivTima: novaLiga.naziv,
        opis: novaLiga.opis
      }
    });
  }

  addLigaGrad(nazivGrada: String, nazivLige: String) {
    let ADD_GRAD_TIM = gql`
      mutation ADD_GRAD_TIM($nazivGrada: String!, $nazivLige: String!) {
        AddGradLige(from: { naziv: $nazivLige }, to: { naziv: $nazivGrada }) {
          from {
            naziv
          }
          to {
            naziv
          }
        }
      }
    `;
    return this.apollo.mutate({
      mutation: ADD_GRAD_TIM,
      variables: {
        nazivGrada: nazivGrada,
        nazivLige: nazivLige
      }
    });
  }

  getAllLiga() {
    const GET_LIGA_QUERY = gql`
      query {
        Liga {
          naziv
        }
      }
    `;
    this.query = this.apollo.watchQuery({
      query: GET_LIGA_QUERY
    });
    return this.query.valueChanges;
  }
}
