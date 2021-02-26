interface Param {
    field: string;
    name: string;
}

export interface Filter {
    field: string;
    value: string;
    params: Array<Param>;
}
