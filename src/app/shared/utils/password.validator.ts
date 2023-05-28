/**
 * Custom password validator
 */

import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const password = control.value;
        const hasNumber = /\d/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
        const hasMinimumLength = password.length > 7;
        const valid = hasNumber && hasUpper && hasLower && hasSpecialCharacters && hasMinimumLength;
        return !valid ? {invalidPassword: {value: control.value}} : null;
    };
}