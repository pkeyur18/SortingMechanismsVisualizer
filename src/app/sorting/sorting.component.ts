import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent implements OnInit {

  array: any = [];
  delay: number = 50;
  strategy: string = '';
  numberOfColumn: number = 100;
  delayString: string ='';
  constructor() { }

  ngOnInit(): void {
    this.strategy = 'selection';
    this.delayString = 'medium';
    // this.numberOfColumn = 250;
    this.generateArray();
  }

  generateArray(){
    this.array = [];
    for(let i = 0; i < this.numberOfColumn; i++){
      this.array.push({color : '#fff', value : Math.floor(Math.random() * (500 - 25) + 25)})
    }
  }

  selectSortingStrategy(value){
    this.strategy = value;
  }

  selectNumberOfColumns(value : number){
    this.numberOfColumn = value;
    this.generateArray();
  }

  selectDelay(value : string){
    this.delayString = value;
    if(value === 'superslow'){
      this.delay = 500;
    }
    else if(value === 'slow'){
      this.delay = 250;
    }
    else if(value === 'medium'){
      this.delay = 125;
    }
    else if(value === 'fast'){
      this.delay = 50;
    }
    else if(value === 'superfast'){
      this.delay = 10;
    }
  }

  run(){
    if(this.strategy === 'selection'){
      this.runSelectionSorting();
    }
    else if(this.strategy === 'bubble'){
      this.runBubbleSorting();
    }
  }

  runSelectionSorting(){
    let len = this.array.length;
    for(let i = 0; i < len-1; i++){
      let min_idx = i;
      setTimeout(() => {
        for(let j = i+1; j < len; j++){
          if(this.array[j]['value'] < this.array[min_idx]['value']){
            this.array[i]['color'] = '#FF5733';
            this.array[j]['color'] = '#FF5733';
            min_idx = j;
          }
        }
      let temp = this.array[min_idx]['value'];
      this.array[min_idx]['value'] = this.array[i]['value'];
      this.array[i]['value'] = temp;
      this.array[i]['color'] = '#fff';
      this.array[min_idx]['color'] = '#fff';
      }, this.delay * i);
    }
  }

  runBubbleSorting(){
    let len = this.array.length;
    let swapped: Boolean;
    for(let i = 0; i < len-1; i++){
      setTimeout(() => {
        swapped = false;
        for(let j = 0; j < len-i-1; j++){
          if(this.array[j]['value'] > this.array[j+1]['value']){
            this.array[j]['color'] = '#FF5733';
            let temp = this.array[j]['value'];
            this.array[j]['value'] = this.array[j+1]['value'];
            this.array[j+1]['value'] = temp;
            swapped = true;
          }
          this.array[j+1]['color'] = '#fff';
        }
        this.array[0]['color'] = '#fff';
      }, this.delay * i);
      if(swapped == false){
        break;
      }
    }
  }
}
