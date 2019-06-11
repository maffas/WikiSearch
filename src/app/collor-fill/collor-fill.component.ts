import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'collor-fill',
  templateUrl: './collor-fill.component.html',
  styleUrls: ['./collor-fill.component.css']
})
export class CollorFillComponent implements OnInit {

    public error = ''

  constructor() {
    if(!CSS.supports("(filter: invert()) or (-webkit-filter: invert())"))
    {
        this.error = 'Ваш браузер не поддерживает темы'
    }
    this.theme = localStorage.getItem("theme")
    this.useTheme()
  }

  useTheme(){
    var elem = document.getElementById('themeTag')
    elem.classList.remove('darkTheme');
    elem.classList.remove('phTheme');
    if(this.theme === 'dark')
        elem.classList.add('darkTheme');
    if(this.theme === 'ph')
        elem.classList.add('phTheme');
  }

  public theme = 'light'

  ngOnInit() {
    
  }
  cangeTheme(value)
  {
    this.theme = value
    this.useTheme()
    this.goTolocalStorage()
  }
  goTolocalStorage(){
    localStorage.setItem("theme", this.theme);
  }

}
