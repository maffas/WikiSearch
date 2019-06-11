import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'input-search',
    templateUrl: './input-search.component.html',
    styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent implements OnInit {

    @Output() sendEvent: EventEmitter<string> = new EventEmitter()
    

    public value = ''
    public dropdownData = []
    public dropdownShow = false
    public curId = -1
    public language = ''
    public show = false
    public img =''


    constructor( private _http: HttpClient) {
    }

    ngOnInit() {
    }

    getResult(limit)
    {
        //"https://"+this.language+".wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=info&list=allcategories&inprop=url&acprefix="+this.value+"&aclimit="+limit
        return this._http.get("https://"+this.language+".wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&prop=info&search="+this.value+"&limit="+limit)
    }

    prop(item)
    {
        if(item === this.value)
            return false
        else
            return true
    }
    changeClass(id)
    {   
        if(this.curId == id)
            return 'select'
        else return false
    }
    control(e, contoll){
        if (this.dropdownData.length === 0)
            return
        e.preventDefault();
        if(contoll === 'enter')
        {
            if(this.curId == -1)
            {
                this.send(this.value)
                document.getElementById('Search').blur()
                this.dropdownShow = false
                return
            }

            this.SelectInDrop(this.curId)
            this.curId = -1
            return
        }
        if (contoll === 'down')
            this.curId += 1
        else if (contoll === 'up')
            this.curId -= 1
        if (this.curId > this.dropdownData.length-1)
            this.curId = 0
        if (this.curId < 0)
            this.curId = this.dropdownData.length-1
    }

    Search()
    {
        var self = this
        self.dropdownShow = true
            self.getResult(10).subscribe((data)=>
            {
                console.log('value', self.value)
                console.log(data)
                if (self.value.length === 0)
                    return
                var now = []
                if(data)
                data[1].map(function(el) {
                    if(el != self.value)
                        now.push(el)
                        self.dropdownData = now
                  });
                else
                return
                if (self.value === '')
                    self.dropdownData = []
            }, error => {
                self.dropdownData = [] 
            })
    }

    SelectInDrop(id)
    {
        this.ChangeRequest(this.dropdownData[+id])
        this.send(this.value)
        document.getElementById('Search').blur()
        return false;
    }

    ChangeRequest(newVal)
    {
        if (/[а-я]/i.test(newVal)) {
            this.language = 'ru'
        } else {
            this.language = 'en'
        }
        this.value = newVal
        this.curId = -1
        if(newVal != '')
        {
            this.Search()
        }
        else
        this.dropdownData= []
    }
    setFocus(e){
        var el = document.querySelector('input');
        if (document.activeElement === el) {
            e.preventDefault();
          }
    }

    send(value){
        this.sendEvent.emit(value)
    }
}
