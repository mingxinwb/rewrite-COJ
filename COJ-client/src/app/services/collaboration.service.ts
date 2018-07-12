import { Injectable } from '@angular/core';

declare const io: any;
@Injectable({
  providedIn: 'root'
})
export class CollaborationService {
  collaborationSocket: any;
  constructor() { }
  // init(): void {
  //   this.collaborationSocket = io(window.location.origin, { query: 'message=' + 'hahaha'});

  //   this.collaborationSocket.on('message', (message) => {
  //     console.log('message received from server: ' + message);
  //   })
  // }
  init(sessionId: string, editor: any): void {
    this.collaborationSocket = io(window.location.origin, { query: 'sessionId=' + sessionId});

    // listeners
    this.collaborationSocket.on('change', (delta: string) => {
      console.log('collaboration from server: editor changes by ' + delta );
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    })
  }

  change(delta: string) {
    this.collaborationSocket.emit('change', delta);
  }
}
