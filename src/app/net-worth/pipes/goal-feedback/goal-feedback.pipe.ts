import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'goalFeedback'
})
export class GoalFeedbackPipe implements PipeTransform {
  transform(percent: number): string {
    let text;

    if (percent > 0.9) {
      text = 'almost there!';
    } else if (percent > 0.75) {
      text = 'over 3 quarters of the way through!';
    } else if (percent > 0.5) {
      text = 'over half way there!';
    } else if (percent > 0.4) {
      text = 'almost half way there!';
    } else if (percent > 0.25) {
      text = 'over a quarter of the way there!';
    } else if (percent > 0.1) {
      text = 'over 10% of the way there!';
    } else if (percent > 0) {
      text = 'making progress towards your goal!';
    } else {
      text = `making a start and you're doing great things.`;
    }
    if (percent >= 1) {
      return `Nicely done! You've completed your goal. Give yourself a massive pat on the back!`;
    } else if (percent > 0.5) {
      return `Nicely done - you're ${text} Keep it up!`;
    } else {
      return `You're ${text} Keep going!`;
    }
  }
}
