import { trigger, transition, style, query, animate } from '@angular/animations';

export const fader = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%',
        opacity: 0,
      }),
    ], { optional: true }),
    query(':enter', [
      animate('500ms ease-in', style({ opacity: 1 })),
    ], { optional: true }),
  ]),
]);