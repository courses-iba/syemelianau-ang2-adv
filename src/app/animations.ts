import {
    trigger,
    transition,
    animate,
    style,
    query,
    state,
    stagger
} from '@angular/animations';

export const sidebarAnimations = [
    trigger('list1', [
        state('in', style({
            opacity: 1,
            transform: 'translateX(0)'
        })),
        transition('void => *', [
            style({
                opacity: 0,
                transform: 'translateX(-230px)'
            }),
            animate(300)
        ]),
        transition('* => void', [
            animate(300, style({
                transform: 'translateX(100px)',
                opacity: 0
            }))
        ])
    ]),
    trigger('list2', [
        state('in', style({
            opacity: 1,
            transform: 'translateX(0)'
        })),
        transition('void => *', [
            style({
                opacity: 0,
                transform: 'translateX(-230px)'
            }),
            animate(400)
        ]),
        transition('* => void', [
            animate(400, style({
                transform: 'translateX(100px)',
                opacity: 0
            }))
        ])
    ]),
    trigger('list3', [
        state('in', style({
            opacity: 1,
            transform: 'translateX(0)'
        })),
        transition('void => *', [
            style({
                opacity: 0,
                transform: 'translateX(-230px)'
            }),
            animate(500)
        ]),
        transition('* => void', [
            animate(500, style({
                transform: 'translateX(100px)',
                opacity: 0
            }))
        ])
    ])
];

export const tableAnimations = [
    trigger('pageAnimation', [
        transition(':enter', [
            query('thead, tbody, tr, .card-header', [
                style({ opacity: 0, transform: 'translateY(-100px)' }),
                stagger(-30, [
                    animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
                ])
            ], { optional: true })
        ])
    ]),
    trigger('filterAnimation', [
        transition(':enter, * => 0', []),
        transition(':increment', [
            query(':enter', [
                style({ opacity: 0, width: '0px' }),
                stagger(50, [
                    animate('300ms ease-out', style({ opacity: 1, width: '*' })),
                ]),
            ], { optional: true })
        ]),
        transition(':decrement', [
            query(':leave', [
                stagger(50, [
                    animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
                ])
            ])
        ])
    ])
];

export const activityAnimations = [
    trigger('widthAnimation', [
        transition(':enter', [
            style({ width: '0', overflow: 'hidden' }),
            animate(500, style({ width: '*' }))
        ]),
        transition(':leave', [
            animate(500, style({ width: 0, overflow: 'hidden' }))
        ])
    ])
];

export const studentAnimations = [
    trigger('fadeAnimation', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('300ms', style({ opacity: 1 }))
        ])
    ])
];
