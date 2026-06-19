import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GameStateService } from '../../core/services/game-state';

interface TabletCard {
  id: string;
  symbol: string;
  orderSymbol: string;
}

@Component({
  selector: 'app-puzzle3',
  imports: [],
  templateUrl: './puzzle3.html',
  styleUrl: './puzzle3.scss',
})
export class Puzzle3 {
  cards: TabletCard[] = [
    { id: 'sun-saturn', symbol: '☉', orderSymbol: '♄' },
    { id: 'star-eye', symbol: '✦', orderSymbol: '👁' },
    { id: 'sun-star', symbol: '☉', orderSymbol: '✦' },
    { id: 'saturn-moon', symbol: '♄', orderSymbol: '☽' },
    { id: 'sun-sun', symbol: '☉', orderSymbol: '☉' },
    { id: 'star-moon', symbol: '✦', orderSymbol: '☽' },
  ];

  slots: (TabletCard | null)[] = [null, null, null];

  selectedCard: TabletCard | null = null;

  showError = false;

  constructor(
    private gameStateService: GameStateService,
    private router: Router,
  ) {}

  get isReady(): boolean {
    return this.slots.every((slot) => slot !== null);
  }

  selectCard(card: TabletCard): void {
    this.selectedCard = card;
  }

  placeIntoSlot(index: number): void {
    if (!this.selectedCard) {
      return;
    }

    if (this.slots[index]) {
      return;
    }

    this.slots[index] = this.selectedCard;

    this.selectedCard = null;
  }

  removeFromSlot(index: number): void {
    this.slots[index] = null;
  }

  isUsed(card: TabletCard): boolean {
    return this.slots.some((slot) => slot?.id === card.id);
  }

  submit(): void {
    const solved =
      this.slots[0]?.id === 'sun-star' &&
      this.slots[1]?.id === 'sun-sun' &&
      this.slots[2]?.id === 'sun-saturn';

    if (!solved) {
      this.showError = true;

      setTimeout(() => {
        this.showError = false;
      }, 400);

      return;
    }

    this.gameStateService.solvePuzzle3();

    this.router.navigate(['/victory']);
  }
}
