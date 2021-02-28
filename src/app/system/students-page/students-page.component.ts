import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { StudentsService } from '../shared/services/students.service';
import { ListElement } from '../shared/models/list-element.model';
import { StudentView } from '../shared/models/student-view.model';
import { Student } from '../shared/models/sudent.model';
import { Filter } from '../shared/models/filter.model';

@Component({
    selector: 'app-students-page',
    templateUrl: './students-page.component.html',
    styleUrls: ['./students-page.component.css']
})
export class StudentsPageComponent implements OnInit {
    students: Array<Student>;
    statusList: Array<ListElement>;
    taskList: Array<ListElement>;
    displayStudents: Array<StudentView>;
    studentsLoaded: boolean;
    statusListLoaded: boolean;
    taskListLoaded: boolean;
    dataProcessed: boolean;
    filter: Filter;
    reqError: any;
    error: any;

    constructor(private studentsService: StudentsService) {
        this.setLoaded(false);
        this.filter = {
            field: 'name',
            value: '',
            params: [
                { field: 'name', name: 'Имя' },
                { field: 'status', name: 'Статус' },
                { field: 'task', name: 'Таск' }
            ]
        };
    }

    ngOnInit(): void {
        this.getStudents();
        this.getStatusList();
        this.getTaskList();
    }

    getStudents(): void {
        this.studentsService.getStudents()
            .pipe(catchError(error => {
                this.error = error;
                return of();
            }))
            .subscribe((students: Array<Student>) => {
                if (!this.error) {
                    this.students = students;
                }
                this.studentsLoaded = true;
            });
    }

    getStatusList(): void {
        this.studentsService.getStatusList()
            .pipe(catchError(error => {
                this.error = error;
                return of();
            }))
            .subscribe((statusList: Array<ListElement>) => {
                if (!this.error) {
                    this.statusList = statusList;
                }
                this.statusListLoaded = true;
            });
    }

    getTaskList(): void {
        this.studentsService.getTaskList()
            .pipe(catchError(error => {
                this.error = error;
                return of();
            }))
            .subscribe((taskList: Array<ListElement>) => {
                if (!this.error) {
                    this.taskList = taskList;
                }
                this.taskListLoaded = true;
            });
    }

    loaded(): boolean {
        const dataLoaded = this.studentsLoaded && this.statusListLoaded && this.taskListLoaded;
        if (dataLoaded && !this.dataProcessed) {
            this.displayStudents = this.students.map((student: Student) => ({
                id: student.id,
                name: student.name,
                status: this.statusList.find(({ id }) => id === student.statusId).name,
                task: this.taskList.find(({ id }) => id === student.taskId).name
            }));
            this.dataProcessed = true;
        }
        return dataLoaded;
    }

    deleteStudent(id: number): void {
        this.studentsService.deleteStudent(id)
            .pipe(catchError(error => {
                this.reqError = error;
                return of();
            }))
            .subscribe(() => {
                if (!this.reqError) {
                    this.setLoaded(false);
                    this.ngOnInit();
                }
            });
    }

    setLoaded(loaded: boolean): void {
        this.studentsLoaded = loaded;
        this.statusListLoaded = loaded;
        this.taskListLoaded = loaded;
        this.dataProcessed = loaded;
    }
}
