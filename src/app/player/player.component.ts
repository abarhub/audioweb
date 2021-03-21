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

  @Input()
  public set urlSelectionnee(url: string | null) {
    this.url = url;
  }

  // @Input()
  // public set play(play: boolean) {
  //   this.isPlaying = play;
  // }

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
    console.log('audio', this.player);
    if (this.player) {
      this.player.load();
      this.player.play();
      if (this.url) {
        this.changementUrl.emit(this.url);
      }
    }
  }

  next2(): void {
    // this.nextUrl();
    // if (this.player) {
    //   this.player.load();
    //   this.player.play();
    // }
    this.next.emit();
  }

  preview2(): void {
    // this.previewUrl();
    // if (this.player) {
    //   this.player.load();
    //   this.player.play();
    // }
    this.preview.emit();
  }

  private attachListeners2(): void {
    // this.audioObj.addEventListener('timeupdate', this.calculateTime, false);
    // this.audioObj.addEventListener('playing', this.setPlayerStatus, false);
    // this.audioObj.addEventListener('pause', this.setPlayerStatus, false);
    // this.audioObj.addEventListener('progress', this.calculatePercentLoaded, false);
    // this.audioObj.addEventListener('waiting', this.setPlayerStatus, false);
    if (this.player) {
      this.player.addEventListener('ended', this.setPlayerStatus, false);
    }
  }

  suite(): void {
    //   this.urlCourante = this.list[this.no];
    //   this.no = (this.no + 1) % this.list.length;
    //   if (this.player) {
    //     this.player.currentTime = 0;
    //     this.player.play();
    //   }
    console.log('suite');
    this.next2();
  }

  private setPlayerStatus = (evt: any) => {
    switch (evt.type) {
      case 'playing':
        //this.playerStatus.next('playing');
        break;
      case 'pause':
        //this.playerStatus.next('paused');
        break;
      case 'waiting':
        //this.playerStatus.next('loading');
        break;
      case 'ended':
        // this.fini = true;
        //this.playerStatus.next('ended');
        // if (!this.stopPlay) {
        //   this.next();
        // }
        this.end.emit();
        break;
      default:
        //this.playerStatus.next('paused');
        break;
    }
  };

}
