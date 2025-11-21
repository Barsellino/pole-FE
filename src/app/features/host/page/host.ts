import { Component, OnInit, computed, signal } from '@angular/core';
import { HostService } from '../../../core/services/host.service';
import { CookieService } from '../../../core/services/cookie.service';
import { HostWSService } from '../services/host-ws.service';
import { TopicsService } from '../../../core/services/topics.service';
import { Topic } from '../../../shared/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './host.html',
  styleUrls: ['./host.css']
})
export class Host implements OnInit {

  sessionId = '';
  loading = true;

  topics = signal<Topic[]>([]);
  selectedTopic = signal<Topic | null>(null);

  // реактивний стан гри (з вебсокету)
  gameState = computed(() => this.ws.state());

  constructor(
    private hostService: HostService,
    private cookie: CookieService,
    private ws: HostWSService,
    private topicsService: TopicsService
  ) {}

  ngOnInit(): void {
    this.loadTopics();
    this.initSession();
  }

  // ---------------------
  //        СЕСІЯ
  // ---------------------

  initSession() {
    const saved = this.cookie.getSessionId();

    if (saved) {
      this.hostService.loadSession(saved).subscribe((res) => {
        if (res && !res.error) {
          this.sessionId = saved;
          this.loading = false;
          this.ws.connect(this.sessionId);
        } else {
          this.createNew();
        }
      });
    } else {
      this.createNew();
    }
  }

  createNew() {
    this.hostService.createSession().subscribe(res => {
      this.sessionId = res.session_id;
      this.cookie.setSessionId(this.sessionId);
      this.loading = false;
      this.ws.connect(this.sessionId);
    });
  }

  // ---------------------
  //        ТЕМИ
  // ---------------------

  loadTopics() {
    this.topicsService.getTopics().subscribe(topics => {
      this.topics.set(topics);
    });
  }

  chooseTopic(topic: Topic) {
    this.selectedTopic.set(topic);
    this.ws.sendSetTopicId(topic.id);  // 🔥 тільки topic_id!
  }

  // ---------------------
  //      КОМАНДИ ГРИ
  // ---------------------

  start(player: 'A' | 'B') {
    this.ws.sendCommand('start_turn', { player });
  }

  pause() {
    this.ws.sendCommand('pause_all');
  }

  correct() {
    this.ws.sendCommand('correct');
  }

  wrong() {
    this.ws.sendCommand('pass_or_wrong');
  }

  nextImage() {
    this.ws.sendCommand('next_image');
  }

  resetTimers() {
    this.ws.sendCommand('reset_times');
  }
}
