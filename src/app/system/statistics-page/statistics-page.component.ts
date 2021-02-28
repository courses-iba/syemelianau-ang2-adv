import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { StudentsService } from '../shared/services/students.service';
import { ListService } from '../shared/services/list.service';
import { ListElement } from '../shared/models/list-element.model';
import { Student } from '../shared/models/student.model';
import { ChartElement } from '../shared/models/chart-element.model';

@Component({
    selector: 'app-statistics-page',
    templateUrl: './statistics-page.component.html'
})
export class StatisticsPageComponent implements OnInit {
    students?: Array<Student>;
    statusList?: Array<ListElement>;
    chart: Array<ChartElement>;
    dataProcessed: boolean;
    error: any;

    constructor(private studentsService: StudentsService, private listService: ListService) {}

    ngOnInit(): void {
        this.getStudents();
        this.getStatusList();
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

    loaded(): boolean {
        const dataLoaded = !!this.students && !!this.statusList;
        if (dataLoaded && !this.dataProcessed) {
            this.chart = this.statusList.map(({ id, name }) => ({
                name, value: this.students.filter(({ statusId }) => statusId === id).length
            }));
            this.dataProcessed = true;
        }
        return dataLoaded || !!this.error;
    }
}
