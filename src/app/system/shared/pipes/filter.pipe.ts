import { Pipe, PipeTransform } from '@angular/core';

import { StudentView } from '../models/student-view.model';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(students: Array<StudentView>, field: string, value: string): Array<StudentView> {
        return field ? students.filter(student => student[field].toLowerCase().includes(value.toLowerCase())) : students;
    }
}
