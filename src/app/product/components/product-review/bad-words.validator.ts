import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function badWordsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let validationResult = null;
    const badWordsRegexp = /(bad|ugly|shit|sucks|crap)/g;

    if (control.value && control.value.match(badWordsRegexp)) {
      validationResult = {badWords: control.value.match(badWordsRegexp)};
    }

    return validationResult;
  };
}
