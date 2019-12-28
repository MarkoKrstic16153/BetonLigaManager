import { Component, OnInit } from "@angular/core";
import { Apollo, QueryRef } from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: "app-timovi",
  templateUrl: "./timovi.component.html",
  styleUrls: ["./timovi.component.css"]
})
export class TimoviComponent implements OnInit {
  timovi: any[] = [];

  TIMOVI_QUERY = gql`
    query {
      Tim {
        naziv
      }
    }
  `;

  private query: QueryRef<any>;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.query = this.apollo.watchQuery({
      query: this.TIMOVI_QUERY,
      variables: {}
    });

    this.query.valueChanges.subscribe(result => {
      this.timovi = result.data.Tim;
    });
  }
}
