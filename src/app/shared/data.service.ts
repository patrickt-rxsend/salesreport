import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
    
    constructor() { }
    
    getProjectName() {
        return 'Dolphin Sales Portal Project';
    }

}