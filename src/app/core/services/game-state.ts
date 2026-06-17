import { Injectable } from '@angular/core';

export interface GameState {
    puzzle1Unlocked: boolean;
    puzzle1Solved: boolean;

    puzzle2Unlocked: boolean;
    puzzle2Solved: boolean;

    puzzle3Unlocked: boolean;
    puzzle3Solved: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class GameStateService {

    private readonly STORAGE_KEY = 'astral-trials-state';

    private readonly defaultState: GameState = {
        puzzle1Unlocked: false,
        puzzle1Solved: false,

        puzzle2Unlocked: false,
        puzzle2Solved: false,

        puzzle3Unlocked: false,
        puzzle3Solved: false
    };

    getState(): GameState {
        const storedState = localStorage.getItem(this.STORAGE_KEY);

        if (!storedState) {
            return { ...this.defaultState };
        }

        return JSON.parse(storedState);
    }

    saveState(state: GameState): void {
        localStorage.setItem(
            this.STORAGE_KEY,
            JSON.stringify(state)
        );
    }

    unlockPuzzle1(): void {
        const state = this.getState();

        state.puzzle1Unlocked = true;

        this.saveState(state);
    }

    solvePuzzle1(): void {
        const state = this.getState();

        state.puzzle1Solved = true;
        state.puzzle2Unlocked = true;

        this.saveState(state);
    }

    solvePuzzle2(): void {
        const state = this.getState();

        state.puzzle2Solved = true;
        state.puzzle3Unlocked = true;

        this.saveState(state);
    }

    solvePuzzle3(): void {
        const state = this.getState();

        state.puzzle3Solved = true;

        this.saveState(state);
    }

    reset(): void {
        localStorage.removeItem(this.STORAGE_KEY);
    }
}