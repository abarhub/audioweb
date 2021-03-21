import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Fichier} from './dto/fichier';
import {ListeFichiersService} from './services/liste-fichiers.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'audioweb';

  urlCourante: Fichier | null = null;
  no: number = 0;
  // private stopPlay: boolean = true;
  // private fini: boolean = false;
  private initialise: boolean = false;
  selectUrl: Subject<string> = new Subject();
  // private audioObj = new Audio();
  urlSelectionee: string = '';


  // @ViewChild('audio') audio: any;


  constructor(private listeFichierService: ListeFichiersService) {

  }

  ngOnInit(): void {
    // this.suite();
    // this.attachListeners();
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
    this.selectUrl.next(this.urlCourante.url);
    // this.no = this.listeFichierService.getNo();
  }

  previewUrl(): void {
    // this.no = (this.no - 1) % this.list.length;
    // if (this.no < 0) {
    //   this.no += this.list.length;
    // }
    // this.urlCourante = this.list[this.no];
    this.listeFichierService.preview();
    this.urlCourante = this.listeFichierService.getCurrent();
    this.selectUrl.next(this.urlCourante.url);
    // this.no = this.listeFichierService.getNo();
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


  // stop(): void {
  //   this.stopPlay = true;
  //   this.audioObj.pause();
  // }

  private init(): void {
    this.listeFichierService.init().subscribe(data => {
      // this.initialise = true;
      this.urlCourante = this.listeFichierService.getCurrent();
      this.selectUrl.next(this.urlCourante.url);
      // this.no = this.listeFichierService.getNo();
      // if (this.player) {
      //   this.player.load();
      // }
    });
  }

  isInitialise(): boolean {
    return this.initialise;
  }

  changementUrl($event: string) {
    this.urlSelectionee = $event;
  }
}
