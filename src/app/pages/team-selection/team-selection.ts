import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-selection',
  imports: [],
  templateUrl: './team-selection.html',
  styleUrl: './team-selection.scss',
})
export class TeamSelection {
  constructor(private readonly router: Router) {}

  selectTeam(team: 'gray' | 'sand' | 'green'): void {
    localStorage.setItem('oracle-team', team);

    this.router.navigate(['/lore', 'puzzle1']);
  }
}
