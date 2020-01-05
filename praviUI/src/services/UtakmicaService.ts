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
        $nazivUtakmice: String!,
        $datumUtakmice: String!,
        $vremeUtakmice: String!,
        $opisUtakmice: String!
      ) {
        CreateUtakmica(
          naziv: $nazivUtakmice,
          datum: $datumUtakmice,
          vreme: $vremeUtakmice,
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
            naziv,
            opis
          },
          to {
            naziv,
            datum,
            vreme
          },
          uloga,
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
  getGoloviUtakmice(datumUtakmice:string,vremeUtakmice:string) {
    let GET_GOLOVI_UTAKMICE = gql`
      query GET_GOLOVI_UTAKMICE($datumUtakmice:String!,$vremeUtakmice:String!){
        Utakmica(filter:{datum:$datumUtakmice,vreme:$vremeUtakmice}){
          datum,
          vreme,
          naziv
          golovi {
            vreme,
            Igrac {
              ime,
              prezime,
              brojDresa,
              tim{
                Tim{
                  naziv
                }
              }
            }
          }
        }
      }`;
    this.query= this.apollo.watchQuery({
      query: GET_GOLOVI_UTAKMICE,
      variables:{
        datumUtakmice:datumUtakmice,
        vremeUtakmice:vremeUtakmice
      }
    });
    return this.query.valueChanges;
  }
  getUtakmica(datumUtakmice:string,vremeUtakmice:string){
    let GET_UTAKMICA=gql`
    query GET_UTAKMICA($datumUtakmice:String!,$vremeUtakmice:String!){
      Utakmica(filter:{datum:$datumUtakmice,vreme:$vremeUtakmice}){
        naziv,
        datum,
        vreme,
        opis,
        stadion{
          Stadion{
            naziv
          }
        }
      }
    }`;
    this.query=this.apollo.watchQuery({
      query:GET_UTAKMICA,
      variables:{
        datumUtakmice:datumUtakmice,
        vremeUtakmice:vremeUtakmice
      }
    });
    return this.query.valueChanges;
  }
  getBrGolovaDomGost(datumUtakmice:string,vremeUtakmice:string)
  {
    let BR_GOLOVA_DOM_GOST=gql`
    query BR_GOLOVA_DOM_GOST($datumUtakmice:String!,$vremeUtakmice:String!){
      Utakmica(filter:{datum:$datumUtakmice,vreme:$vremeUtakmice}){
        timovi{
          uloga,
          golovi,
          Tim{
            naziv
          }
        }
      }
    }`;
    this.query=this.apollo.watchQuery({
      query:BR_GOLOVA_DOM_GOST,
      variables:{
        datumUtakmice:datumUtakmice,
        vremeUtakmice:vremeUtakmice
      }
    });
    return this.query.valueChanges;
  }
  getSastavGost(datumUtakmice:string,vremeUtakmice:string){
    let GET_SASTAV_GOST=gql`
    query GET_SASTAV_GOST($datumUtakmice:String!,$vremeUtakmice:String!){
      Utakmica(filter:{datum:$datumUtakmice,vreme:$vremeUtakmice}){
        timovi(filter:{uloga:"gost"}){
          Tim{
            igraci{
              Igrac{
                ime,
                prezime,
                brojDresa,
                brojTelefona
              }
            }
          }
        }
      }
    }`;
    this.query=this.apollo.watchQuery({
      query:GET_SASTAV_GOST,
      variables:{
        datumUtakmice:datumUtakmice,
        vremeUtakmice:vremeUtakmice
      }
    });
    return this.query.valueChanges;
  }
  getSastavDomacin(datumUtakmice:string,vremeUtakmice:string){
    let GET_SASTAV_DOMACIN=gql`
    query GET_SASTAV_DOMACIN($datumUtakmice:String!,$vremeUtakmice:String!){
      Utakmica(filter:{datum:$datumUtakmice,vreme:$vremeUtakmice}){
        timovi(filter:{uloga:"domacin"}){
          Tim{
            igraci{
              Igrac{
                ime,
                prezime,
                brojDresa,
                brojTelefona
              }
            }
          }
        }
      }
    }`;
    this.query=this.apollo.watchQuery({
      query:GET_SASTAV_DOMACIN,
      variables:{
        datumUtakmice:datumUtakmice,
        vremeUtakmice:vremeUtakmice
      }
    });
    return this.query.valueChanges;
  }
}
