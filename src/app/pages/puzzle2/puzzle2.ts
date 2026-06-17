import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GameStateService } from '../../core/services/game-state';

@Component({
  selector: 'app-puzzle2',
  imports: [],
  templateUrl: './puzzle2.html',
  styleUrl: './puzzle2.scss',
})
export class Puzzle2 {

  solved = false;

  constructor(
    private gameStateService: GameStateService,
    private router: Router
  ) { }

  solvePuzzle(): void {
    this.gameStateService.solvePuzzle2();
    this.solved = true;
  }

  backToGateway(): void {
    this.router.navigate(['/']);
  }
}