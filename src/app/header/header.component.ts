import { Component, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private storage: DataStorageService) { }

  ngOnInit(): void {
  }

  saveData(){
    this.storage.storeRecipes();
  }

  fetchData() {
    this.storage.fetchRecipes().subscribe();
  }

}
