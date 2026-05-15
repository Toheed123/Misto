import {
  trigger,
  transition,
  style,
  animate,
  query,
  group
} from '@angular/animations';

export const sliderAnimation = trigger('rightSlider', [

  // ENTER
  transition(':enter', [
    group([
      query('.slider', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' }))
      ], { optional: true }),

      query('.backdrop', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ], { optional: true })
    ])
  ]),

  // LEAVE
  transition(':leave', [
    group([
      query('.slider', [
        animate('250ms ease-in', style({ transform: 'translateX(100%)' }))
      ], { optional: true }),

      query('.backdrop', [
        animate('250ms ease-in', style({ opacity: 0 }))
      ], { optional: true })
    ])
  ])
]);