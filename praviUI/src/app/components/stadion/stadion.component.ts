import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { StadionService } from "src/services/StadionService";
import { Stadion } from "src/models/Stadion";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-stadion",
  templateUrl: "./stadion.component.html",
  styleUrls: ["./stadion.component.css"]
})
export class StadionComponent implements OnInit {
  stadion: Stadion;
  loadingStadion: boolean = true;
  loadingSlicni: boolean = true;
  slicniStadioni: Stadion[];
  constructor(
    private location: Location,
    private stadionService: StadionService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.stadionService
        .getStadion(params.nazivStadiona)
        .subscribe(({ data, loading }) => {
          this.loadingStadion = loading;
          this.stadion = data.Stadion[0];
          console.log(this.stadion);
          this.stadionService
            .getSlicnePoKapacitetu(
              this.stadion.kapacitet - 100,
              this.stadion.kapacitet + 100
            )
            .subscribe(({ data, loading }) => {
              this.loadingSlicni = loading;
              console.log(data.Stadion);
              this.slicniStadioni = data.Stadion.filter(
                s => s.naziv != this.stadion.naziv
              ).slice(0, 5);
            });
        });
    });
  }
  goBack() {
    this.location.back();
  }
}
