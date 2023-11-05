import { Square, Piece } from './types.js';
import { SquareSet } from './squareSet.js';
import { Board } from './board.js';
import { Position } from './chess.js';
export declare const squareSet: (squares: SquareSet) => string;
export declare const piece: (piece: Piece) => string;
export declare const board: (board: Board) => string;
export declare const square: (sq: Square) => string;
export declare const dests: (dests: Map<Square, SquareSet>) => string;
export declare const perft: (pos: Position, depth: number, log?: boolean) => number;
