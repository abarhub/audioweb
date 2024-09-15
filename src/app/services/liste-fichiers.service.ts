import {Fichier} from '../dto/fichier';
import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListeFichiersService {

  private urlCourante: Fichier | null = null;
  private no: number = 0;

  private list: Fichier[] = [];

  /*[
  {url: 'http://www.download2mp3.com/beethoven_htm_files/BeethovenMoonlight1.mp3', nom: 'Moonlight', auteur: 'beethoven'},
  {url: 'http://www.download2mp3.com/beethoven_htm_files/BeethovenMoonlight2.mp3', nom: 'Moonlight', auteur: 'beethoven'},
  {url: 'http://www.download2mp3.com/beethoven_htm_files/BeethovenMoonlight3.mp3', nom: 'Moonlight', auteur: 'beethoven'},
  {url: 'http://www.hearchoirs.net/Arteviva/AV21_Lacrimosa_R.mp3', nom: 'Lacrimosa, do "Requiem"', auteur: 'W.A. Mozart'},
  {
    url: 'https://www.liberliber.it/mediateca/musica/r/ravel/bolero/mp3/ravel_bolero_ol_01.mp3',
    nom: 'Boléro',
    auteur: 'Maurice Ravel'
  },
  // 'https://www.w3schools.com/html/horse.mp3',
  // 'https://www.w3schools.com/html/horse.mp3',
  {url: 'https://www.w3schools.com/html/horse.mp3', nom: 'horse', auteur: 'cheval'}
];*/

  constructor(private http: HttpClient) {

  }

  private getJSON(): Observable<Fichier[]> {
    return this.http.get<Fichier[]>('./assets/list-files.json');
  }

  next(): void {
    this.no = (this.no + 1) % this.list.length;
  }

  preview(): void {
    this.no = (this.no - 1);
    if (this.no < 0) {
      this.no += this.list.length;
    }
  }

  getCurrent(): Fichier {
    return this.list[this.no];
  }

  getNo(): number {
    return this.no + 1;
  }

  getList(): Fichier[] {
    return this.list;
  }

  init(): Observable<boolean> {
    console.log('init');
    const observable = new Observable<boolean>((observer) => {

      this.getJSON().subscribe(data => {
        console.log('getJSON',data);
        if (data && data.length > 0) {
          this.list = data;
          observer.next(true);
        } else {
          observer.next(false);
        }
      }, error => {
        console.error('Error', error);
        observer.error(error);
      }, () => {
        observer.complete();
      });

    });

    return observable;
  }


}
