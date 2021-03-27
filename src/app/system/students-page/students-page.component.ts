import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { StudentsService } from '../shared/services/students.service';
import { ListService } from '../shared/services/list.service';
import { ListElement } from '../shared/models/list-element.model';
import { StudentView } from '../shared/models/student-view.model';
import { Student } from '../shared/models/student.model';
import { Filter } from '../shared/models/filter.model';
import { tableAnimations } from '../../animations';

@Component({
    selector: 'app-students-page',
    templateUrl: './students-page.component.html',
    styleUrls: ['./students-page.component.css'],
    animations: tableAnimations
})
export class StudentsPageComponent implements OnInit {
    students?: Array<Student>;
    statusList?: Array<ListElement>;
    taskList?: Array<ListElement>;
    displayStudents: Array<StudentView>;
    dataProcessed: boolean;
    filter: Filter;
    error: any;

    constructor(private studentsService: StudentsService, private listService: ListService) {
        this.setNotLoaded();
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

    createError = error => {
        this.error = error;
        return of();
    };

    getStudents(): void {
        this.studentsService.getStudents()
            .pipe(catchError(this.createError))
            .subscribe((students: Array<Student>) => {
                this.students = students;
            });
    }

    getStatusList(): void {
        this.listService.getStatusList()
            .pipe(catchError(this.createError))
            .subscribe((statusList: Array<ListElement>) => {
                this.statusList = statusList;
            });
    }

    getTaskList(): void {
        this.listService.getTaskList()
            .pipe(catchError(this.createError))
            .subscribe((taskList: Array<ListElement>) => {
                this.taskList = taskList;
            });
    }

    loaded(): boolean {
        const dataLoaded = !!this.students && !!this.statusList && !!this.taskList;
        if (dataLoaded && !this.dataProcessed) {
            this.displayStudents = this.students.map((student: Student) => ({
                id: student.id,
                name: student.name,
                status: this.statusList.find(({ id }) => id === student.statusId).name,
                task: this.taskList.find(({ id }) => id === student.taskId).name
            }));
            this.dataProcessed = true;
        }
        return dataLoaded || !!this.error;
    }

    deleteStudent(id: number): void {
        this.studentsService.deleteStudent(id).subscribe(() => {
            this.setNotLoaded();
            this.ngOnInit();
        });
    }

    setNotLoaded(): void {
        this.students = undefined;
        this.statusList = undefined;
        this.taskList = undefined;
        this.dataProcessed = false;
    }
}
