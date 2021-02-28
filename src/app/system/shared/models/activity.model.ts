export class Activity {
    name: string;
    task: number;
    percent: number;
    type: string;
    min: number;
    max: number;

    constructor(name: string, task: number) {
        this.name = name;
        this.task = task;
        this.min = 1;
        this.max = 10;
        this.percent = 100 / this.max * task;
        this.type = this.percent < 30 ? 'danger'
            : this.percent > 65 ? 'success'
                : 'warning';
    }
}
