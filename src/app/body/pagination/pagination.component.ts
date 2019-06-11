import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {


    @Output() sendPage: EventEmitter<any> = new EventEmitter()
    @Input() perPage = 20
    @Input() allResult = 0
    @Input() currentPage = 1
    public pageRange = 2

    constructor() { }

    ngOnInit() {
    }

    totalPage() {
        return Math.ceil(this.allResult/this.perPage)
    }

    rangeStart() {
        var start = this.currentPage - this.pageRange

        return (start > 0) ? start : 1
    }

    rangeEnd() {
        var end = this.currentPage + this.pageRange

        return (end < this.totalPage()) ? end : 1
    }

    getPages() {
        var pages = []

        for(var i:any = this.rangeStart(); i <= this.rangeEnd(); i++) {
            pages.push(i)
        }
        return pages
    }

    topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0; 
    }

    changePage(position) {
        if (position === this.currentPage)
            return
        if(position === "left")
        {
            this.currentPage --
            this.sendPage.emit(this.currentPage)
            // console.log(this.currentPage)
        }
        if(position === "right")
        {
            this.currentPage ++
            this.sendPage.emit(this.currentPage)
            // console.log(this.currentPage)
        }
        else {
            this.currentPage = position
            this.sendPage.emit(position)
        }
        this.topFunction()
    }
}
