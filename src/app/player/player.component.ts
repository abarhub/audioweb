import {Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {Fichier} from '../dto/fichier';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  url: string | null = null;
  isPlaying: boolean = false;
  @Output() next = new EventEmitter<void>();
  @Output() preview = new EventEmitter<void>();
  @Output() end = new EventEmitter<void>();
  @Output() changementUrl = new EventEmitter<string>();
  @Output() pause = new EventEmitter<void>();

  @Input()
  public set urlSelectionnee(url: string | null) {
    this.url = url;
  }

  private player: HTMLAudioElement | null = null;

  @ViewChild('audio') set playerRef(ref: ElementRef<HTMLAudioElement>) {
    this.player = ref.nativeElement;
  }

  @Input() changeUrl: Subject<string> = new Subject<string>();

  constructor() {
  }

  ngOnInit(): void {
    this.attachListeners2();
    this.changeUrl.subscribe(data => {
      if (data) {
        this.url = data;
        this.play2();
      }
    });
  }

  play2(): void {
    if (this.player) {
      if (!this.player.paused) {
        this.player.load();
      }
      this.player.play();
      if (this.url) {
        this.changementUrl.emit(this.url);
      }
    }
  }

  next2(): void {
    this.next.emit();
  }

  preview2(): void {
    this.preview.emit();
  }

  private attachListeners2(): void {
    if (this.player) {
      this.player.addEventListener('ended', this.setPlayerStatus, false);
    }
  }

  suite(): void {
    this.next2();
  }

  private setPlayerStatus = (evt: any) => {
    switch (evt.type) {
      case 'playing':
        break;
      case 'pause':
        break;
      case 'waiting':
        break;
      case 'ended':
        this.end.emit();
        break;
      default:
        break;
    }
  };

  pause2(): void {
    if (this.player) {
      this.player?.pause();
      this.pause.emit();
    }
  }
}
