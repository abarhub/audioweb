import {Component, Input, OnInit} from '@angular/core';
import {Fichier} from '../dto/fichier';
import {ListeFichiersService} from '../services/liste-fichiers.service';

@Component({
    selector: 'app-list-files',
    templateUrl: './list-files.component.html',
    styleUrls: ['./list-files.component.scss'],
    standalone: false
})
export class ListFilesComponent implements OnInit {

  no: number = 0;
  url: string = '';
  urlCourante: Fichier | null = null;

  @Input()
  public set urlSelectionee(url: string) {
    this.url = url;
    this.urlCourante = this.listeFichierService.getCurrent();
  }

  constructor(private listeFichierService: ListeFichiersService) {
  }

  ngOnInit(): void {
  }

  getList(): Fichier[] {
    return this.listeFichierService.getList();
  }

}
