import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Rx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  hostUrl:string = window.location.host;
  cvUrl:string = "/assets/Joshua.pdf";
  link:any = document.createElement('a');
  constructor() {}

  ngAfterViewInit() {
    this.animateSkills();
  }

  downloadCv(){
    this.link.setAttribute('type', 'hidden');
    this.link.href = this.cvUrl
    this.link.download = this.hostUrl;
    document.body.appendChild(this.link);
    this.link.click();
    this.link.remove();
  }

  viewCv(){
    this.link.setAttribute('type', 'hidden');
    this.link.setAttribute('target', '_blank');
    this.link.href = this.cvUrl
    document.body.appendChild(this.link);
    this.link.click();
  }

  animateSkills() {
    /* Credits:
    * https://www.developphp.com/video/JavaScript/Circular-Progress-Loader-Canvas-JavaScript-Programming-Tutorial
    */

    let Progress = function (element) {

      this.context = element.getContext("2d");
      this.refElement = element.parentNode;
      this.loaded = 0;
      this.start = 4.72;
      this.width = this.context.canvas.width;
      this.height = this.context.canvas.height;
      this.total = parseInt(this.refElement.dataset.percent, 10);
      this.timer = null;

      this.diff = 0;

      this.init();
    };

    Progress.prototype = {
      init: function () {
        let self = this;
        self.timer = setInterval(function () {
          self.run();
        }, 25);
      },
      run: function () {
        let self = this;

        self.diff = ((self.loaded / 100) * Math.PI * 2 * 10).toFixed(2);
        self.context.clearRect(0, 0, self.width, self.height);
        self.context.lineWidth = 10;
        self.context.fillStyle = "#000";
        self.context.strokeStyle = "#4CAF50";
        self.context.textAlign = "center";

        self.context.fillText(self.loaded + "%", self.width * .5, self.height * .5 + 2, self.width);
        self.context.beginPath();
        self.context.arc(35, 35, 30, self.start, self.diff / 10 + self.start, false);
        self.context.stroke();

        if (self.loaded >= self.total) {
          clearInterval(self.timer);
        }

        self.loaded++;
      }
    };

    let CircularSkillBar = function (elements) {
      this.bars = document.querySelectorAll(elements);
      if (this.bars.length > 0) {
        this.init();
      }
    };

    CircularSkillBar.prototype = {
      init: function () {
        this.tick = 25;
        this.progress();

      },
      progress: function () {
        let self = this;
        let index = 0;
        let firstCanvas = self.bars[0].querySelector("canvas");
        let firstProg = new Progress(firstCanvas);



        let timer = setInterval(function () {
          index++;

          if (index < self.bars.length) {
            let canvas = self.bars[index].querySelector("canvas");
            let prog = new Progress(canvas);
          }

          if (index == self.bars.length) {
            clearInterval(timer);
          }

        }, self.tick * 100);

      }
    };

    // document.addEventListener("DOMContentLoaded", function () {

    // });

    let circularBars = new CircularSkillBar("#bars .bar");

  }
}
