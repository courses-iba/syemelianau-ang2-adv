import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { StudentsService } from '../shared/services/students.service';
import { Student } from '../shared/models/sudent.model';
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

    getStudent(id: number): void {
        this.studentsService.getStudent(id)
            .pipe(catchError(error => {
                this.error = error;
                return of();
            }))
            .subscribe((student: Student) => {
                if (!this.error) {
                    this.student = student;
                }
                this.studentLoaded = true;
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
        return dataLoaded;
    }

    createStudent(): void {
        this.studentsService.createStudent(this.student)
            .pipe(catchError(error => {
                this.error = error;
                return of();
            }))
            .subscribe(() => {
                if (!this.error) {
                    this.router.navigate(['/system/students']).then();
                }
            });
    }

    updateStudent(): void {
        this.studentsService.updateStudent(this.student.id, this.student)
            .pipe(catchError(error => {
                this.error = error;
                return of();
            }))
            .subscribe(() => {
                if (!this.error) {
                    this.router.navigate(['/system/students']).then();
                }
            });
    }

    onSubmit(): void {
        this.student.id ? this.updateStudent() : this.createStudent();
    }
}
