import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { Student } from '../models/student.model';
import { ListElement } from '../models/list-element.model';

@Injectable({
    providedIn: 'root'
})
export class ListService {
    private apiUri = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getStatusList(): Observable<Array<ListElement>> {
        return this.http.get<Array<ListElement>>(`${this.apiUri}/statuslist`);
    }

    getStatusListByNames(names: Array<string>): Observable<Array<ListElement>> {
        return this.http.get<Array<ListElement>>(`${this.apiUri}/statuslist?name=${names.join('&name=')}`);
    }

    getTaskList(): Observable<Array<ListElement>> {
        return this.http.get<Array<ListElement>>(`${this.apiUri}/tasklist`);
    }

    getTaskListByIds(students: Array<Student>): Observable<Array<ListElement>> {
        return this.http.get<Array<ListElement>>(
            `${this.apiUri}/tasklist?id=${students.map(({ taskId }) => taskId).join('&id=')}`
        );
    }
}
