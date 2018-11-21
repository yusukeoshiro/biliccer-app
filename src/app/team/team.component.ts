import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  constructor( private route: ActivatedRoute ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    console.log(id);
  }

}
