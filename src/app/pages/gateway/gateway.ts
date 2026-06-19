import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { GameStateService } from '../../core/services/game-state';

@Component({
  selector: 'app-gateway',
  imports: [CommonModule, FormsModule],
  templateUrl: './gateway.html',
  styleUrl: './gateway.scss',
})
export class Gateway {
  code = '';
  message = '';

  constructor(
    private router: Router,
    private gameStateService: GameStateService,
  ) {}

  submitCode(): void {
    const state = this.gameStateService.getState();

    const normalizedCode = this.code.trim().toUpperCase();

    switch (normalizedCode) {
      case 'ASTRA':
        this.gameStateService.unlockPuzzle1();

        this.code = '';
        this.message = '';

        this.router.navigate(['/puzzle1']);
        break;

      case 'LUMEN':
        if (!state.puzzle1Solved) {
          this.message = 'Pareģojums vēl nav piepildīts.';
          return;
        }

        this.code = '';
        this.message = '';

        this.router.navigate(['/puzzle2']);
        break;

      case 'VIREN':
        if (!state.puzzle2Solved) {
          this.message = 'Otrā vīzija vēl nav atklāta.';
          return;
        }

        this.code = '';
        this.message = '';

        this.router.navigate(['/puzzle3']);
        break;

      default:
        this.message = 'Gars vēl neatbild.';
    }
  }

  resetProgress(): void {
    this.gameStateService.reset();

    this.code = '';

    this.message = 'Progress atiestatīts.';
  }
}
