import { Routes } from '@angular/router';

import { Gateway } from './pages/gateway/gateway';
import { Puzzle1 } from './pages/puzzle1/puzzle1';
import { Puzzle2 } from './pages/puzzle2/puzzle2';
import { Puzzle3 } from './pages/puzzle3/puzzle3';
import { Victory } from './pages/victory/victory';

export const routes: Routes = [
    {
        path: '',
        component: Gateway
    },
    {
        path: 'puzzle1',
        component: Puzzle1
    },
    {
        path: 'puzzle2',
        component: Puzzle2
    },
    {
        path: 'puzzle3',
        component: Puzzle3
    },
    {
        path: 'victory',
        component: Victory
    },
    {
        path: '**',
        redirectTo: ''
    }
];