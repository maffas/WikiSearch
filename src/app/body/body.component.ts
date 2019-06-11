import { Component, OnInit, Input, Output, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-body',
    templateUrl: './body.component.html',
    styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

    @Input() searchName
    public result = []
    public allResult = 0
    public perPage = 20
    public currentPage = 1
    public timeToResult
    public language = ''
    public sort = ''
    
    public loading = true

  constructor( private _http: HttpClient) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.searchName.previousValue !== changes.searchName.currentValue)
    {
        this.currentPage = 1
        this.sort = ''
    }
    if(this.searchName != '')
    {
        this.getAll()
    }
    this.result = []
  }

  getUrl(id) {
        return "https://"+ this.language +".wikipedia.org/wiki/" + this.result[id].title.replace(/ /g, '_')
  }
  getCorrectDate(date) {
        var months = ['янв.', 'фев.', 'мар.', 'апр.','май', 'июн.', 'июл.', 'авг.','сен.', 'окт.', 'ноя.', 'дек.'];
        var D = new Date(date)
        return D.getDate() + ' ' + months[D.getMonth()] + ' ' + D.getFullYear()
  }

  getRequest(){
    return this._http.get("https://" + this.language+".wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=" +
    this.searchName + "&srlimit="+ this.perPage + "&sroffset=" + this.perPage * (this.currentPage-1) +
    "&srqiprofile=classic&srwhat=text&srinterwiki=1" + this.sort)
  }

  getAll(){
    this.loading = true
    this.result = []
    if (/[а-я]/i.test(this.searchName)) {
        this.language = 'ru'
    } else {
        this.language = 'en'
    }
    var t0 = performance.now();
    this.getRequest().subscribe((data)=>
    {
        var self = this
        self.loading = false
        if( data['query'].search.length === 0 ) 
        {
            self.allResult = 0
            return 
        }
        self.allResult = data['query'].searchinfo.totalhits
        this.goTolocalStorage()
        if(data['query'])
        data['query'].search.map(function(el) {
            var obj = {
                title: el.title,
                wordcount: el.wordcount,
                snippet: el.snippet.replace(/<\/?[^>]+>/g,'').replace(/&quot;/g,'"'),
                timestamp: el.timestamp
            }
                self.result.push(obj)
          });
        else
        return
    })
    var t1 = performance.now();
    this.timeToResult = (t1 - t0).toFixed(4)

  }

  changeSort(value)
  {
    var reg = new RegExp( value , "g")
    if(reg.test(this.sort))
        this.sort = ''
    else if(value === 'edit_desc')
        this.sort = '&srsort=last_edit_desc'
    else if(value === 'edit_asc')
        this.sort = '&srsort=last_edit_asc'
    this.currentPage = 1
    this.getAll()
  }

  goTolocalStorage() {
    var mas = []
    if (JSON.parse(localStorage.getItem("history"))){
        mas = JSON.parse(localStorage.getItem("history"))
        if(mas.length > 50)
        mas.shift()
    }
    var obj = {
        search: this.searchName,
        totalResult: this.allResult,
        date: new Date()
    }
    mas.push(obj)
    var serial = JSON.stringify(mas);
    localStorage.setItem("history", serial);
  }
}
