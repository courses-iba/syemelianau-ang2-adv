import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { ListElement } from '../models/list-element.model';

@Injectable({
    providedIn: 'root'
})
export class StatusService {
    private apiUri = environment.apiUrl + '/statuslist';

    constructor(private http: HttpClient) {}

    getStatusList(): Observable<Array<ListElement>> {
        return this.http.get<Array<ListElement>>(`${this.apiUri}`);
    }
}
