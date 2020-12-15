import { Injectable } from '@angular/core';
import * as confetti from 'canvas-confetti';

@Injectable({
  providedIn: 'root'
})
export class ConfettiService {
  private _canvas;
  private _cannon;

  constructor() {
    this._canvas = document.getElementById('confetti') as HTMLCanvasElement;
    this._cannon = confetti.create(this._canvas, { resize: true });
  }

  public setOff(): void {
    this._canvas.style.zIndex = 100;
    this._cannon({
      particleCount: 240,
      spread: 300,
      ticks: 300
    });
  }

  public hide(): void {
    this._cannon.reset();
    this._canvas.style.zIndex = -1;
  }
}
