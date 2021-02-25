import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { Student } from '../models/sudent.model';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    private apiUri = environment.apiUrl + '/student';

    constructor(private http: HttpClient) {}

    getStudents(): Observable<Array<Student>> {
        return this.http.get<Array<Student>>(this.apiUri);
    }
}
