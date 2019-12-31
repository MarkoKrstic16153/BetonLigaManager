import { Injectable } from "@angular/core";
import { QueryRef, Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Injectable({ providedIn: "root" })
export class UtakmicaService {
  query: QueryRef<any>;
  constructor(private apollo: Apollo) {}

  createUtakmica(nazivUtakmice: String,datumUtakmice: String,vremeUtakmice: String,opisUtakmice: String) {
    let CREATE_UTAKMICA = gql`
      mutation CREATE_UTAKMICA(
        $nazivUtakmice: String!S
        $datumUtakmice: String!
        $vremeUtakmice: String!
        $opisUtakmice: String!
      ) {
        CreateUtakmica(
          naziv: $nazivUtakmice
          datum: $datumUtakmice
          vreme: $vremeUtakmice
          opis: $opisUtakmice
        ) {
          naziv
        }
      }
    `;
    return this.apollo.mutate({
      mutation: CREATE_UTAKMICA,
      variables: {
        nazivUtakmice: nazivUtakmice,
        datumUtakmice: datumUtakmice,
        vremeUtakmice: vremeUtakmice,
        opisUtakmice: opisUtakmice
      }
    });
  }
  addTeamToUtakmica(nazivTima: String, datumUtakmice: String,vremeUtakmice: String, uloga: String,golovi: String){
    let ADD_TIM_TO_UTAKMICA = gql`
      mutation ADD_TIM_TO_UTAKMICA(
        $nazivTima: String!,
        $datumUtakmice: String!,
        $vremeUtakmice: String!,
        $uloga: String!,
        $golovi: String!
      ) {
        AddTimUtakmica(
          from: { naziv: $nazivTima },
          to: { datum: $datumUtakmice, vreme: $vremeUtakmice },
          data: { uloga: $uloga, golovi: $golovi }
        ) {
          from {
            naziv
            opis
          },
          to {
            naziv
            datum
            vreme
          },
          uloga
          golovi
        }
      }
    `;
    return this.apollo.mutate({
      mutation: ADD_TIM_TO_UTAKMICA,
      variables: {
        nazivTima: nazivTima,
        datumUtakmice: datumUtakmice,
        vremeUtakmice: vremeUtakmice,
        uloga: uloga,
        golovi: golovi
      }
    });
  }
  addUtakmicaStadion(datumUtakmice: String,vremeUtakmice: String,nazivStadiona: String) {
    let ADD_UTAKMICA_STADION = gql`
      mutation ADD_UTAKMICA_STADION(
        $datumUtakmice: String!,
        $vremeUtakmice: String!,
        $nazivStadiona: String!
      ) {
        AddUtakmicaStadion(
          from: { datum: $datumUtakmice, vreme: $vremeUtakmice },
          to: { naziv: $nazivStadiona }
        ) {
          from {
            datum
          },
          to {
            naziv
          }
        }
      }`;
    return this.apollo.mutate({
      mutation: ADD_UTAKMICA_STADION,
      variables: {
        datumUtakmice: datumUtakmice,
        vremeUtakmice: vremeUtakmice,
        nazivStadiona: nazivStadiona
      }
    });
  }
  getGoloviUtakmice() {
    let GET_GOLOVI_UTAKMICE = gql`
      query GET_GOLOVI_UTAKMICE {
        Utakmica {
          datum,
          vreme,
          golovi {
            vreme,
            Igrac {
              ime,
              prezime,
              brojDresa
            }
          }
        }
      }`;
    this.query= this.apollo.watchQuery({
      query: GET_GOLOVI_UTAKMICE
    });
    return this.query.valueChanges;
  }
}
