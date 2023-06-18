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
  private initialise: boolean = false;
  selectUrl: Subject<string> = new Subject();
  urlSelectionee: string = '';

  constructor(private listeFichierService: ListeFichiersService) {

  }

  ngOnInit(): void {
    this.init();
  }

  nextUrl(): void {
    this.listeFichierService.next();
    this.urlCourante = this.listeFichierService.getCurrent();
    this.selectUrl.next(this.urlCourante.url);
  }

  previewUrl(): void {
    this.listeFichierService.preview();
    this.urlCourante = this.listeFichierService.getCurrent();
    this.selectUrl.next(this.urlCourante.url);
  }

  private init(): void {
    this.listeFichierService.init().subscribe(_ => {
      this.urlCourante = this.listeFichierService.getCurrent();
      this.selectUrl.next(this.urlCourante.url);
    });
  }

  isInitialise(): boolean {
    return this.initialise;
  }

  changementUrl($event: string) {
    this.urlSelectionee = $event;
  }

  pause() {

  }
}
