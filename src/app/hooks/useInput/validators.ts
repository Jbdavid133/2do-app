import {Dictionary, isEmpty, isNil} from 'lodash';

export type Validator = ((inputValue: string | undefined) => Dictionary<string> | null)

export namespace Validators {
    export const Required = (message: string) => <T>(value: T): Dictionary<string> | null => {
        if (isEmpty(value)) {
            return {required: message};
        }

        return null;
    };
    export const MaxLength = <T>(maxLength: number, message: string) => (value: T): Dictionary<string> | null => {
        if (!isNil(maxLength) && String(value).length > maxLength) {
            return {maxLength: message};
        }

        return null;
    };
}