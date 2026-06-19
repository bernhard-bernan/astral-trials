import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LORE_CONTENT } from '../../content/lore-content';
import { LOCATION_HINTS } from '../../content/location-hints';

@Component({
  selector: 'app-lore-page',
  imports: [],
  templateUrl: './lore-page.html',
  styleUrl: './lore-page.scss',
})
export class LorePage {
  content = LORE_CONTENT.puzzle1;

  locationHint = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    const id = this.route.snapshot.paramMap.get('id');

    if (id && id in LORE_CONTENT) {
      this.content = LORE_CONTENT[id as keyof typeof LORE_CONTENT];
    }

    const team = localStorage.getItem('oracle-team');

    if (team && id && team in LOCATION_HINTS) {
      this.locationHint =
        LOCATION_HINTS[team as keyof typeof LOCATION_HINTS][
          id as 'puzzle1' | 'puzzle2' | 'puzzle3'
        ];
    }
  }

  continue(): void {
    this.router.navigate(['/gateway']);
  }
}
