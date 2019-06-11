import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor() {
        var returnObj = JSON.parse(localStorage.getItem("history"))
        this.history = returnObj.reverse()
   }

  @Input() show = false
  @Output() showEvent: EventEmitter<boolean> = new EventEmitter()
  public history = []

  ngOnInit() {
  }

  getCorrectDate(date){
    var months = ['янв.', 'фев.', 'мар.', 'апр.','май', 'июн.', 'июл.', 'авг.','сен.', 'окт.', 'ноя.', 'дек.'];
    var D = new Date(date)
    return D.getDate() + ' ' + months[D.getMonth()] + ' ' + D.getFullYear() + '(' + D.getHours() + ':' + D.getMinutes() + ')'
  }

  close(e){
    e.preventDefault()
  
    if (this.show) {
      this.showEvent.emit(false)
    }
  }
}
