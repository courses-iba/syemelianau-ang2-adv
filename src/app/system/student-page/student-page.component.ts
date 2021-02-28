import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { StudentsService } from '../shared/services/students.service';
import { ListService } from '../shared/services/list.service';
import { Student } from '../shared/models/student.model';
import { ListElement } from '../shared/models/list-element.model';

@Component({
    selector: 'app-student-page',
    templateUrl: './student-page.component.html',
    styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit {
    student?: Student;
    statusList: Array<ListElement>;
    taskList: Array<ListElement>;
    studentLoaded: boolean;
    statusListLoaded: boolean;
    taskListLoaded: boolean;
    dataProcessed: boolean;
    error: any;

    constructor(
        private studentsService: StudentsService,
        private listService: ListService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.studentLoaded = false;
        this.statusListLoaded = false;
        this.taskListLoaded = false;
        this.dataProcessed = false;
    }

    ngOnInit(): void {
        this.route.queryParamMap.subscribe(params => {
            this.dataProcessed = false;
            const studentId = +params.get('id');
            if (studentId) {
                this.studentLoaded = false;
                this.getStudent(studentId);
            } else {
                this.studentLoaded = true;
                this.student = undefined;
            }
        });
        this.getStatusList();
        this.getTaskList();
    }

    createError = error => {
        this.error = error;
        return of();
    };

    getStudent(id: number): void {
        this.studentsService.getStudent(id)
            .pipe(catchError(this.createError))
            .subscribe((student: Student) => {
                this.student = student;
                this.studentLoaded = true;
            });
    }

    getStatusList(): void {
        this.listService.getStatusList()
            .pipe(catchError(this.createError))
            .subscribe((statusList: Array<ListElement>) => {
                this.statusList = statusList;
                this.statusListLoaded = true;
            });
    }

    getTaskList(): void {
        this.listService.getTaskList()
            .pipe(catchError(this.createError))
            .subscribe((taskList: Array<ListElement>) => {
                this.taskList = taskList;
                this.taskListLoaded = true;
            });
    }

    loaded(): boolean {
        const dataLoaded = this.studentLoaded && this.statusListLoaded && this.taskListLoaded;
        if (dataLoaded && !this.dataProcessed) {
            if (!this.student) {
                this.student = {
                    name: '',
                    statusId: this.statusList[0].id,
                    taskId: this.taskList[0].id
                };
            }
            this.dataProcessed = true;
        }
        return dataLoaded || !!this.error;
    }

    createStudent(): void {
        this.studentsService.createStudent(this.student)
            .pipe(catchError(this.createError))
            .subscribe(() => this.router.navigate(['/system/students']).then());
    }

    updateStudent(): void {
        this.studentsService.updateStudent(this.student.id, this.student)
            .pipe(catchError(this.createError))
            .subscribe(() => this.router.navigate(['/system/students']).then());
    }

    onSubmit(): void {
        this.student.id ? this.updateStudent() : this.createStudent();
    }
}
