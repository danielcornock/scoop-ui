import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const fader = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        width: '100%',
        opacity: 0,
        transform: 'scale(0) translateY(100%)'
      })
    ]),
    query(':enter', [
      animate(
        '600ms ease',
        style({ opacity: 1, transform: 'scale(1) translateY(0)' })
      )
    ])
  ])
]);

const optional = { optional: true };

// export const slideIn = trigger('routeAnimations', [
//   transition('* <=> *', [
//     query(
//       ':enter, :leave',
//       [
//         style({
//           position: 'absolute',
//           top: 0,
//           right: 0,
//           width: '100%'
//         })
//       ],
//       optional
//     ),
//     query(':enter', [style({ right: '-5%', opacity: 0 })], optional),
//     group([
//       query(
//         ':leave',
//         [animate('300ms ease', style({ right: '5%', opacity: 0 }))],
//         optional
//       ),
//       query(
//         ':enter',
//         [animate('1000ms ease', style({ right: '0%', opacity: 1 }))],
//         optional
//       )
//     ])
//   ])
// ]);

export const slideIn = trigger('routeAnimations', [
  transition('* <=> *', [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ],
      optional
    ),
    query(':enter', [style({ right: '-100%', opacity: 1 })], optional),
    group([
      query(':leave', [animate('0ms ease', style({ opacity: 1 }))], optional),
      query(
        ':enter',
        [animate('500ms ease', style({ right: '0%', opacity: 1 }))],
        optional
      )
    ])
  ])
]);
