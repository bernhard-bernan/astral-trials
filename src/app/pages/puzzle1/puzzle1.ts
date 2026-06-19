import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GameStateService } from '../../core/services/game-state';

@Component({
  selector: 'app-puzzle1',
  imports: [],
  templateUrl: './puzzle1.html',
  styleUrl: './puzzle1.scss',
})
export class Puzzle1 {
  constructor(
    private readonly router: Router,
    private readonly gameStateService: GameStateService,
  ) {}

  readonly symbols = ['☉', '☽', '✦', '👁', '♄'];

  readonly correctOrder = ['✦', '☉', '♄', '👁', '☽'];

  selectedSymbol: string | null = null;

  recentlyFilledSlot: number | null = null;

  showError = false;

  slots: (string | null)[] = [null, null, null, null, null];

  get isReady(): boolean {
    return this.slots.every((slot) => slot !== null);
  }

  selectSymbol(symbol: string): void {
    if (this.isUsed(symbol)) {
      return;
    }

    this.selectedSymbol = symbol;
  }

  placeIntoSlot(index: number): void {
    if (!this.selectedSymbol) {
      return;
    }

    if (this.slots[index]) {
      return;
    }

    this.slots[index] = this.selectedSymbol;

    this.recentlyFilledSlot = index;

    setTimeout(() => {
      this.recentlyFilledSlot = null;
    }, 250);

    this.selectedSymbol = null;
  }

  removeFromSlot(index: number): void {
    if (!this.slots[index]) {
      return;
    }

    this.slots[index] = null;
  }

  submit(): void {
    if (!this.isReady) {
      return;
    }

    const isCorrect = this.slots.every((slot, index) => slot === this.correctOrder[index]);

    if (isCorrect) {
      this.gameStateService.solvePuzzle1();

      this.router.navigate(['/lore', 'puzzle2']);

      return;
    }

    this.showError = true;

    setTimeout(() => {
      this.showError = false;
    }, 600);
  }

  isUsed(symbol: string): boolean {
    return this.slots.includes(symbol);
  }
}
