import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Fichier} from './fichier';
import {ListeFichiersService} from './liste-fichiers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'audioweb';

  urlCourante: Fichier | null = null;
  no: number = 0;
  private stopPlay: boolean = true;
  private fini: boolean = false;
  private initialise: boolean = false;

  // private audioObj = new Audio();


  // @ViewChild('audio') audio: any;

  private player: HTMLAudioElement | null = null;

  @ViewChild('audio') set playerRef(ref: ElementRef<HTMLAudioElement>) {
    this.player = ref.nativeElement;
  }


  constructor(private listeFichierService: ListeFichiersService) {

  }

  ngOnInit(): void {
    // this.suite();
    // this.attachListeners();
    this.attachListeners2();
    this.init();
  }

  // private attachListeners(): void {
  //   // this.audioObj.addEventListener('timeupdate', this.calculateTime, false);
  //   this.audioObj.addEventListener('playing', this.setPlayerStatus, false);
  //   this.audioObj.addEventListener('pause', this.setPlayerStatus, false);
  //   // this.audioObj.addEventListener('progress', this.calculatePercentLoaded, false);
  //   this.audioObj.addEventListener('waiting', this.setPlayerStatus, false);
  //   this.audioObj.addEventListener('ended', this.setPlayerStatus, false);
  // }

  private attachListeners2(): void {
    // this.audioObj.addEventListener('timeupdate', this.calculateTime, false);
    // this.audioObj.addEventListener('playing', this.setPlayerStatus, false);
    // this.audioObj.addEventListener('pause', this.setPlayerStatus, false);
    // this.audioObj.addEventListener('progress', this.calculatePercentLoaded, false);
    // this.audioObj.addEventListener('waiting', this.setPlayerStatus, false);
    if (this.player) {
      this.player.addEventListener('ended', this.setPlayerStatus2, false);
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

  // run(): void {
  //   this.stopPlay = false;
  //   this.fini = false;
  //   // this.next();
  // }

  // next(): void {
  //   if (this.audioObj && this.urlCourante) {
  //     this.audioObj.src = this.urlCourante?.url;
  //     this.audioObj.load();
  //     this.audioObj.play();
  //   }
  // }

  nextUrl(): void {
    // this.urlCourante = this.list[this.no];
    // this.no = (this.no + 1) % this.list.length;
    this.listeFichierService.next();
    this.urlCourante = this.listeFichierService.getCurrent();
    this.no = this.listeFichierService.getNo();
  }

  previewUrl(): void {
    // this.no = (this.no - 1) % this.list.length;
    // if (this.no < 0) {
    //   this.no += this.list.length;
    // }
    // this.urlCourante = this.list[this.no];
    this.listeFichierService.preview();
    this.urlCourante = this.listeFichierService.getCurrent();
    this.no = this.listeFichierService.getNo();
  }

  // private setPlayerStatus = (evt: any) => {
  //   switch (evt.type) {
  //     case 'playing':
  //       //this.playerStatus.next('playing');
  //       break;
  //     case 'pause':
  //       //this.playerStatus.next('paused');
  //       break;
  //     case 'waiting':
  //       //this.playerStatus.next('loading');
  //       break;
  //     case 'ended':
  //       this.fini = true;
  //       //this.playerStatus.next('ended');
  //       if (!this.stopPlay) {
  //         this.next();
  //       }
  //       break;
  //     default:
  //       //this.playerStatus.next('paused');
  //       break;
  //   }
  // };

  private setPlayerStatus2 = (evt: any) => {
    switch (evt?.type) {
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
        // this.urlCourante = this.list[this.no];
        // this.no = (this.no + 1) % this.list.length;
        // this.nextUrl();
        // console.log('audio', this.player);
        // if (this.player) {
        //   this.player.load();
        //   this.player.play();
        // }
        // this.next2();
        //this.playerStatus.next('ended');
        // if (!this.stopPlay) {
        //   this.next();
        // }
        break;
      default:
        //this.playerStatus.next('paused');
        break;
    }
  };

  // stop(): void {
  //   this.stopPlay = true;
  //   this.audioObj.pause();
  // }

  play(): void {
    console.log('audio', this.player);
    if (this.player) {
      this.player.load();
      this.player.play();
    }
  }

  next2(): void {
    this.nextUrl();
    if (this.player) {
      this.player.load();
      this.player.play();
    }
  }

  preview(): void {
    this.previewUrl();
    if (this.player) {
      this.player.load();
      this.player.play();
    }
  }

  private init(): void {
    this.listeFichierService.init().subscribe(data => {
      this.initialise = true;
      this.urlCourante = this.listeFichierService.getCurrent();
      this.no = this.listeFichierService.getNo();
      if (this.player) {
        this.player.load();
      }
    });
  }

  getList(): Fichier[] {
    return this.listeFichierService.getList();
  }

  isInitialise(): boolean {
    return this.initialise;
  }
}
