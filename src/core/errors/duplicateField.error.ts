import {DomainError} from "./domain.error";

export class DuplicateFieldError extends DomainError {
    constructor(field:string) {
        super(`User with such ${field} already exists`,
            'DUPLICATE_FIELD_ERROR',
            field);
    }
}