import { Injectable } from "@angular/core";
import { QueryRef, Apollo } from "apollo-angular";
import { Igrac } from "../models/Igrac";
import gql from "graphql-tag";
import { variable } from "@angular/compiler/src/output/output_ast";

@Injectable({ providedIn: "root" })
export class IgracService {
  query: QueryRef<any>;
  constructor(private apollo: Apollo) {}
  addIgrac(noviIgrac: Igrac, tim: string) {
    let ADD_IGRAC = gql`
      mutation dodajIgraca(
        $ime: String!
        $prezime: String!
        $brojDresa: String!
        $godRodjenja: String!
        $brojTelefona: String!
        $pozicija: String!
        $opis: String!
      ) {
        CreateIgrac(
          ime: $ime
          prezime: $prezime
          brojDresa: $brojDresa
          godRodjenja: $godRodjenja
          brojTelefona: $brojTelefona
          pozicija: $pozicija
          opis: $opis
        ) {
          ime
        }
      }
    `;
    return this.apollo.mutate({
      mutation: ADD_IGRAC,
      variables: {
        ime: noviIgrac.ime,
        prezime: noviIgrac.prezime,
        brojDresa: noviIgrac.brojDresa,
        godRodjenja: noviIgrac.godRodjenja,
        brojTelefona: noviIgrac.brojTelefona,
        pozicija: noviIgrac.pozicija,
        opis: noviIgrac.opis
      }
    });
  }
  getIgraciTim(nazivTima: string) {
    let GET_IGRACI_TIM = gql`
      query GET_IGRACI_TIM($nazivTima: String!) {
        Tim(filter: { naziv: $nazivTima }) {
          igraci {
            Igrac {
              ime
              prezime
              brojDresa
              godRodjenja
              brojTelefona
              pozicija
              opis
            }
          }
        }
      }
    `;
    this.query = this.apollo.watchQuery({
      query: GET_IGRACI_TIM,
      variables: { nazivTima: nazivTima }
    });
    return this.query.valueChanges;
  }
  addIgracToTim(brojTelefonaIgraca: String, nazivTima: String) {
    let ADD_IGRAC_TO_TIM = gql`
      mutation ADD_IGRAC_U_TIM(
        $brojTelefonaIgraca: String!
        $nazivTima: String!
      ) {
        AddIgracTim(
          from: { brojTelefona: $brojTelefonaIgraca }
          to: { naziv: $nazivTima }
        ) {
          from {
            ime
            prezime
            brojTelefona
          }
          to {
            naziv
          }
        }
      }
    `;
    return this.apollo.mutate({
      mutation: ADD_IGRAC_TO_TIM,
      variables: {
        brojTelefonaIgraca: brojTelefonaIgraca,
        nazivTima: nazivTima
      }
    });
  }
  addIgracGol(
    brojTelefonaIgraca: String,
    datumUtakmice: String,
    vremeUtakmice: String,
    vremeGola: String
  ) {
    let ADD_IGRAC_GOL_UTAKMICA = gql`
      mutation ADD_IGRAC_GOL_UTAKMICA(
        $brojTelefonaIgraca: String!
        $datumUtakmice: String!
        $vremeUtakmice: String!
        $vremeGola: String!
      ) {
        AddIgracGolovi(
          from: { brojTelefona: $brojTelefonaIgraca }
          to: { datum: $datumUtakmice, vreme: $vremeUtakmice }
          data: { vreme: $vremeGola }
        ) {
          from {
            ime
            prezime
            brojTelefona
          }
          to {
            naziv
            datum
            vreme
          }
        }
      }
    `;
    return this.apollo.mutate({
      mutation: ADD_IGRAC_GOL_UTAKMICA,
      variables: {
        brojTelefonaIgraca: brojTelefonaIgraca,
        datumUtakmice: datumUtakmice,
        vremeUtakmice: vremeUtakmice,
        vremeGola: vremeGola
      }
    });
  }
  addIgracToUtakmica(
    brojTelefonaIgraca: String,
    datumUtakmice: String,
    vremeUtakmice: String
  ) {
    let ADD_IGRAC_U_UTAKMICU = gql`
      mutation ADD_IGRAC_U_UTAKMICU(
        $brojTelefonaIgraca: String!
        $datumUtakmice: String!
        $vremeUtakmice: String!
      ) {
        AddIgracUtakmice(
          from: { brojTelefona: $brojTelefonaIgraca }
          to: { datum: $datumUtakmice, vreme: $vremeUtakmice }
        ) {
          from {
            ime
            prezime
            brojTelefona
          }
          to {
            naziv
            datum
            vreme
          }
        }
      }
    `;
    return this.apollo.mutate({
      mutation: ADD_IGRAC_U_UTAKMICU,
      variables: {
        brojTelefonaIgraca: brojTelefonaIgraca,
        datumUtakmice: datumUtakmice,
        vremeUtakmice: vremeUtakmice
      }
    });
  }
  getIgracStartsWith(pocetakImena: String) {
    let GET_IGRAC_STARTS_WITH = gql`
      query GET_IGRAC_STARTS_WITH($pocetakImena: String!) {
        Igrac(filter: { ime_starts_with: $pocetakImena }) {
          ime
          prezime
          brojDresa
          brojTelefona
          tim {
            Tim {
              naziv
            }
          }
        }
      }
    `;
    this.query = this.apollo.watchQuery({
      query: GET_IGRAC_STARTS_WITH,
      variables: {
        pocetakImena: pocetakImena
      }
    });
    return this.query.valueChanges;
  }
  getIgracByPosition(pozicija: String, brojTelefona?: String) {
    let GET_IGRAC_BY_POSITION = gql`
      query GET_IGRAC_BY_POSITION(
        $pozicija: String!
        $brojTelefonaIgraca: String
      ) {
        Igrac(
          filter: { pozicija: $pozicija, brojTelefona_not: $brojTelefonaIgraca }
        ) {
          ime
          prezime
          brojDresa
          brojTelefona
        }
      }
    `;
    this.query = this.apollo.watchQuery({
      query: GET_IGRAC_BY_POSITION,
      variables: {
        pozicija: pozicija,
        brojTelefonaIgraca: brojTelefona || null
      }
    });
    return this.query.valueChanges;
  }
  getIgracByNumber(brojDresa: String, brojTelefona?: String) {
    let GET_IGRAC_BY_NUMBER = gql`
      query GET_IGRAC_BY_NUMBER(
        $brojDresa: String!
        $brojTelefonaIgraca: String
      ) {
        Igrac(
          filter: {
            brojDresa: $brojDresa
            brojTelefona_not: $brojTelefonaIgraca
          }
        ) {
          ime
          prezime
          brojDresa
          brojTelefona
        }
      }
    `;
    this.query = this.apollo.watchQuery({
      query: GET_IGRAC_BY_NUMBER,
      variables: {
        brojDresa: brojDresa,
        brojTelefonaIgraca: brojTelefona || null
      }
    });
    return this.query.valueChanges;
  }
  getIgrac(brojTelefonaIgraca: String) {
    let GET_IGRAC = gql`
      query GET_IGRAC($brojTelefonaIgraca: String!) {
        Igrac(filter: { brojTelefona: $brojTelefonaIgraca }) {
          ime
          prezime
          brojDresa
          brojTelefona
          opis
          pozicija
          tim {
            Tim {
              naziv
            }
          }
          utakmice {
            Utakmica {
              naziv
            }
          }
          golovi {
            vreme
          }
        }
      }
    `;
    this.query = this.apollo.watchQuery({
      query: GET_IGRAC,
      variables: {
        brojTelefonaIgraca: brojTelefonaIgraca
      }
    });
    return this.query.valueChanges;
  }
  getTopStrelci() {
    let TOP_STRELCI = gql`
      query TOP_STRELCI {
        Igrac(filter: { golovi_not: null }) {
          ime
          prezime
          brojDresa
          brojTelefona
          golovi {
            vreme
          }
        }
      }
    `;
    this.query = this.apollo.watchQuery({
      query: TOP_STRELCI
    });
    return this.query.valueChanges;
  }
  getTopIskustvo() {
    let TOP_ISKUSTVO = gql`
      query TOP_ISKUSTVO {
        Igrac(filter: { utakmice_not: null }) {
          ime
          prezime
          utakmice {
            Utakmica {
              naziv
            }
          }
        }
      }
    `;
    this.query = this.apollo.watchQuery({
      query: TOP_ISKUSTVO
    });
    return this.query.valueChanges;
  }
}
