import { Component } from '@angular/core';

@Component({
  selector: 'app-puzzle1',
  imports: [],
  templateUrl: './puzzle1.html',
  styleUrl: './puzzle1.scss',
})
export class Puzzle1 {

  symbols = [
    '☉',
    '☽',
    '✦',
    '👁',
    '♄'
  ];

  selectedSymbol: string | null = null;

  recentlyFilledSlot: number | null = null;

  slots: (string | null)[] = [
    null,
    null,
    null,
    null,
    null
  ];

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

  isUsed(symbol: string): boolean {

    return this.slots.includes(symbol);
  }

}