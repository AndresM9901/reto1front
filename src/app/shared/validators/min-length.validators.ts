import { AbstractControl, ValidatorFn } from '@angular/forms';

export function minLengthValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl) => {
        if (!control.value) return null;
        return control.value.length >= minLength ? null : { minlength: { requiredLength: minLength, actualLength: control.value.length } };
    };
}
