import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Student } from '../shared/models/student.model';
import { StudentsService } from '../shared/services/students.service';
import { ListElement } from '../shared/models/list-element.model';
import { ListService } from '../shared/services/list.service';
import { Activity } from '../shared/models/activity.model';

@Component({
    selector: 'app-current-activity-page',
    templateUrl: './activity-page.component.html',
    styleUrls: ['./activity-page.component.css']
})
export class ActivityPageComponent implements OnInit {
    activities: Array<Activity>;
    statuses: Array<string>;
    error: any;

    constructor(private  studentsService: StudentsService, private listService: ListService) {
        this.statuses = ['Open', 'In progress', 'on Hold'];
    }

    ngOnInit(): void {
        this.getStatusList(this.statuses, (statusList: Array<ListElement>) => {
            this.getStudents(statusList, (students: Array<Student>) => {
                this.getTaskList(students, (taskList: Array<ListElement>) => {
                    this.setActivities(students, taskList);
                });
            });
        });
    }

    setActivities(students: Array<Student>, taskList: Array<ListElement>): void {
        this.activities = students.map(({ name, taskId }) => new Activity(
            name, +taskList.find(({ id }) => id === taskId).name.replace('task', '')
        ));
    }

    createError = error => {
        this.error = error;
        return of();
    };

    getStatusList(list: Array<string>, callback: (list: Array<ListElement>) => void): void {
        this.listService.getStatusListByNames(list)
            .pipe(catchError(this.createError))
            .subscribe((statusList: Array<ListElement>) => callback(statusList));
    }

    getStudents(list: Array<ListElement>, callback: (students: Array<Student>) => void): void {
        this.studentsService.getStudentsByStatusIds(list)
            .pipe(catchError(this.createError))
            .subscribe((students: Array<Student>) => callback(students));
    }

    getTaskList(students: Array<Student>, callback: (list: Array<ListElement>) => void): void {
        this.listService.getTaskListByIds(students)
            .pipe(catchError(this.createError))
            .subscribe((taskList: Array<ListElement>) => callback(taskList));
    }

    loaded(): boolean {
        return !!this.activities || !!this.error;
    }
}
