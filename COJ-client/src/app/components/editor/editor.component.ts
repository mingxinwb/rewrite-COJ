import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CollaborationService } from '../../services/collaboration.service';
declare const ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editor: any;
  sessionId: string;
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
  constructor(private collaboration: CollaborationService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.sessionId = params['id'];
        this.initEditor();
      })
  }

  initEditor(): void {
    this.editor = ace.edit('editor');
    this.editor.$blockScrolling = Infinity;
    this.editor.setTheme('ace/theme/eclipse');
    this.resetEditor();

    this.collaboration.init(this.sessionId, this.editor);
    this.editor.lastAppliedChange = null;

    // regist change callback
    this.editor.on('change', (e)=> {
      console.log('editor changes: ' + JSON.stringify(e));
      if (this.editor.lastAppliedChange != e) {
        this.collaboration.change(JSON.stringify(e));
      }
    });
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
