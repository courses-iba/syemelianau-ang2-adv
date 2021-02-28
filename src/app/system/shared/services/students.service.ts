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
    private apiUri = environment.apiUrl + '/student';

    constructor(private http: HttpClient) {}

    getStudents(): Observable<Array<Student>> {
        return this.http.get<Array<Student>>(`${this.apiUri}`);
    }

    createStudent(student: Student): Observable<Student> {
        return this.http.post<Student>(`${this.apiUri}`, student);
    }

    updateStudent(id: number, studentData: Student): Observable<Student> {
        return this.http.put<Student>(`${this.apiUri}/${id}`, studentData);
    }

    deleteStudent(id: number): Observable<Student> {
        return this.http.delete<Student>(`${this.apiUri}/${id}`);
    }

    getStudent(id: number): Observable<Student> {
        return this.http.get<Student>(`${this.apiUri}/${id}`);
    }

    getStudentsByStatusIds(list: Array<ListElement>): Observable<Array<Student>> {
        return this.http.get<Array<Student>>(
            `${this.apiUri}?statusId=${list.map(({ id }) => id).join('&statusId=')}`
        );
    }
}
