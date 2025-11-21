import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayService } from '../../../service/display.service';
import { DisplayWSService } from '../../../service/display-ws.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./display.css'],
  templateUrl: './display.html'
})
export class Display {

  code = signal('');
  error = signal('');
  connected = signal(false);

  gameState = computed(() => this.ws.state());

  constructor(
    private rest: DisplayService,
    private ws: DisplayWSService
  ) {

    // 🔥 Автоматичне фонове завантаження всіх картинок теми
    effect(() => {
      const gs = this.gameState();
      if (!gs || !gs.images?.length) return;

      const urls = gs.images.map((i: { src: any; }) => i.src);
      this.preloadImages(urls);
    });
  }

  connect() {
    this.rest.getSession(this.code()).subscribe((res: any) => {
      if (!res?.id) {
        this.error.set('Сесію не знайдено');
        return;
      }

      this.error.set('');
      this.connected.set(true);
      this.ws.connect(this.code());
    });
  }

  // -------- PRELOAD --------
  async preloadImages(urls: string[]) {
    for (const url of urls) {
      await new Promise((resolve) => {
        const img = new Image();
        img.onload = img.onerror = resolve;
        img.src = url;
      });
    }
  }

  // ----- getters для HTML -----
  topic = computed(() => this.gameState()?.topic || null);
  activePlayer = computed(() => this.gameState()?.activePlayer || null);
  timeA = computed(() => this.gameState()?.timeA || 0);
  timeB = computed(() => this.gameState()?.timeB || 0);
  running = computed(() => this.gameState()?.running || false);

  currentImageSrc = computed(() => {
    const gs = this.gameState();
    if (!gs || !gs.images?.length) return null;
    return gs.images[gs.imageIndex]?.src || null;
  });

  currentImageAlt = computed(() => {
    const gs = this.gameState();
    if (!gs || !gs.images?.length) return '';
    return gs.images[gs.imageIndex]?.alt || '';
  });
}
