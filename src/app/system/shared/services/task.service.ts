import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { ListElement } from '../models/list-element.model';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private apiUri = environment.apiUrl + '/tasklist';

    constructor(private http: HttpClient) {}

    getTaskList(): Observable<Array<ListElement>> {
        return this.http.get<Array<ListElement>>(`${this.apiUri}`);
    }
}
