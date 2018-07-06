import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';


import { Problem } from '../models/problem.model';
import { PROBLEMS } from '../mock-problems';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // problems: Problem[] = PROBLEMS;
  private _problemSource = new BehaviorSubject<Problem[]>([]);
  constructor(private http: Http) { }

  getProblems(): Observable<Problem[]> {
    // return this.problems;
    this.http.get('api/v1/problems')
        .toPromise()
        .then((res: Response) => {
          this._problemSource.next(res.json());
        })
        .catch(this.handleError);
    return this._problemSource.asObservable();
  }

  getProblem(id: number) {
    // return this.problems.find((problem) => problem.id === id);
    return this.http.get(`api/v1/problems/${id}`)
        .toPromise()
        .then((res: Response) => {
          this.getProblems();
          return res.json();
        })
        .catch(this.handleError);
  }

  addProblem(problem: Problem) {
    // problem.id = this.problems.length + 1;
    // this.problems.push(problem);
    const headers = new Headers({'content-type': 'application/json'});
    const requestOptions = new RequestOptions({headers: headers});
    return this.http.post('/api/v1/problems', problem, requestOptions)
        .toPromise()
        .then((res: Response) => {
          this.getProblems();
          return res.json;
        })
        .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error);
  }
}
