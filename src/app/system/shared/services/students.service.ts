import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { Student } from '../models/sudent.model';
import { ListElement } from '../models/list-element.model';

@Injectable({
    providedIn: 'root'
})
export class StudentsService {
    private apiUri = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getStudents(): Observable<Array<Student>> {
        return this.http.get<Array<Student>>(`${this.apiUri}/student`);
    }

    getStatusList(): Observable<Array<ListElement>> {
        return this.http.get<Array<ListElement>>(`${this.apiUri}/statuslist`);
    }

    getTaskList(): Observable<Array<ListElement>> {
        return this.http.get<Array<ListElement>>(`${this.apiUri}/tasklist`);
    }
}
