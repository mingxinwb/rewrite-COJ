import { Component, OnInit } from '@angular/core';
import { CollaborationService } from '../../services/collaboration.service';
declare const ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editor: any;
  language: string = 'Java';
  languages: string[] = ['Java', 'Python'];
  defaultContent = {
    'Java': `public class Example {
      public static void main(String[] args) {
        // Type your Java code here...
      }
    }`,
    'Python': `class Solution:
      def example():
        #Write your Python code here...`
  };
  constructor(private collaboration: CollaborationService) { }

  ngOnInit() {
    this.editor = ace.edit('editor');
    this.editor.$blockScrolling = Infinity;
    this.editor.setTheme('ace/theme/eclipse');
    this.resetEditor();
    this.collaboration.init();
  }

  resetEditor(): void {
    this.editor.setValue(this.defaultContent[this.language]);
    this.editor.getSession().setMode('ace/mode/' + this.language.toLowerCase());
  }

  setLanguage(language: string): void {
    this.language = language;
    this.resetEditor();
  }

  submit(): void {
    const userCodes = this.editor.getValue();
    console.log(userCodes);
  }

}
