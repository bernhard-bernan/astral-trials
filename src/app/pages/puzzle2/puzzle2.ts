import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GameStateService } from '../../core/services/game-state';

interface Relic {
  id: string;
  image: string;

  group: string;

  redSymbol: string;
  blueSymbol: string;
  goldSymbol: string;
}

type LightColor = 'red' | 'blue' | 'gold';

@Component({
  selector: 'app-puzzle2',
  imports: [],
  templateUrl: './puzzle2.html',
  styleUrl: './puzzle2.scss',
})
export class Puzzle2 {
  solved = false;

  currentLight: LightColor = 'red';

  readonly lights: LightColor[] = ['red', 'blue', 'gold'];

  relics: Relic[] = [
    {
      id: 'vase',
      image: '/ui/relics/vase.png',

      group: 'sun',

      redSymbol: '☉',
      blueSymbol: '',
      goldSymbol: '',
    },
    {
      id: 'mask',
      image: '/ui/relics/mask.png',

      group: 'sun',

      redSymbol: '',
      blueSymbol: '☉',
      goldSymbol: '',
    },
    {
      id: 'tablet',
      image: '/ui/relics/tablet.png',

      group: 'sun',

      redSymbol: '',
      blueSymbol: '',
      goldSymbol: '☉',
    },
    {
      id: 'orb',
      image: '/ui/relics/orb.png',

      group: 'star',

      redSymbol: '✦',
      blueSymbol: '',
      goldSymbol: '',
    },
    {
      id: 'scroll-case',
      image: '/ui/relics/scroll-case.png',

      group: 'star',

      redSymbol: '',
      blueSymbol: '✦',
      goldSymbol: '',
    },
    {
      id: 'dagger',
      image: '/ui/relics/dagger.png',

      group: 'other',

      redSymbol: '◈',
      blueSymbol: '',
      goldSymbol: '♄',
    },
  ];

  currentIndex = 0;

  selectedRelicIds: string[] = [];

  constructor(
    private gameStateService: GameStateService,
    private router: Router,
  ) {}

  get visibleRelics(): Relic[] {
    return this.relics.slice(this.currentIndex, this.currentIndex + 2);
  }

  get lightLabel(): string {
    switch (this.currentLight) {
      case 'red':
        return 'SARKANĀ GAISMA';

      case 'blue':
        return 'ZILĀ GAISMA';

      case 'gold':
        return 'ZELTA GAISMA';
    }
  }

  cycleLight(): void {
    const currentIndex = this.lights.indexOf(this.currentLight);

    const nextIndex = (currentIndex + 1) % this.lights.length;

    this.currentLight = this.lights[nextIndex];
  }

  previousRelics(): void {
    if (this.currentIndex <= 0) {
      return;
    }

    this.currentIndex--;
  }

  nextRelics(): void {
    if (this.currentIndex >= this.relics.length - 2) {
      return;
    }

    this.currentIndex++;
  }

  selectRelic(relic: Relic): void {
    const index = this.selectedRelicIds.indexOf(relic.id);

    if (index >= 0) {
      this.selectedRelicIds.splice(index, 1);

      return;
    }

    if (this.selectedRelicIds.length >= 3) {
      return;
    }

    this.selectedRelicIds.push(relic.id);
  }

  isSelected(relic: Relic): boolean {
    return this.selectedRelicIds.includes(relic.id);
  }

  solvePuzzle(): void {
    this.gameStateService.solvePuzzle2();

    this.solved = true;
  }

  backToGateway(): void {
    this.router.navigate(['/']);
  }

  getVisibleSymbol(relic: Relic): string {
    switch (this.currentLight) {
      case 'red':
        return relic.redSymbol;

      case 'blue':
        return relic.blueSymbol;

      case 'gold':
        return relic.goldSymbol;
    }
  }

  submit(): void {
    if (this.selectedRelicIds.length !== 3) {
      return;
    }

    const selectedRelics = this.relics.filter((relic) => this.selectedRelicIds.includes(relic.id));

    const groups = selectedRelics.map((relic) => relic.group);

    const solved = groups.every((group) => group === groups[0]);

    if (!solved) {
      return;
    }

    this.gameStateService.solvePuzzle2();

    this.router.navigate(['/lore', 'puzzle3']);
  }

  get isReady(): boolean {
    return this.selectedRelicIds.length === 3;
  }
}
