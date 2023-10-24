import { useState, useRef, useMemo, useCallback } from 'react';

const isNotEmpty = ({ message } = {}) => ({
    name: 'isNotEmpty',
    message,
    validate: (value) => {
        let isEmpty = value === null || value === undefined || value === '';
        if (!isEmpty && typeof value === 'string' && value.trim() === '') {
            isEmpty = true;
        }
        return !isEmpty;
    }
});

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const validateValueAsync = (value, validators) => __awaiter(void 0, void 0, void 0, function* () {
    for (const validator of validators) {
        const result = validator.validate(value);
        const success = result instanceof Promise ? yield result : result;
        if (!success) {
            return {
                validator: validator.name,
                message: validator.message || `Validation "${validator.name}" failed`
            };
        }
    }
    return null;
});
const validateValue = (value, validators) => {
    for (const validator of validators) {
        if (!validator.validate(value)) {
            return {
                validator: validator.name,
                message: validator.message || `Validation "${validator.name}" failed`
            };
        }
    }
    return null;
};

const useForm = (props = {}) => {
    const [values, setValues] = useState(() => props.defaultValues || {});
    const [errors, setErrors] = useState({});
    const touched = useRef({});
    const controllers = useMemo(() => Object.keys(values).reduce((acc, name) => {
        acc[name] = {
            value: values[name],
            error: errors[name],
            hasValidators: Boolean(props.validators && props.validators[name]),
            touched: touched.current[name] || false,
            onChange: (value, error) => {
                setValues((values) => (Object.assign(Object.assign({}, values), { [name]: value })));
                touched.current[name] = true;
                let validationError = error;
                if (!error && props.validators && props.validators[name]) {
                    validationError = validateValue(value, props.validators[name]);
                }
                setErrors((errors) => {
                    if (!validationError && !errors[name]) {
                        return errors;
                    }
                    const newErrors = Object.assign({}, errors);
                    if (validationError) {
                        newErrors[name] = validationError;
                    }
                    else {
                        delete newErrors[name];
                    }
                    return newErrors;
                });
            }
        };
        return acc;
    }, {}), [values, errors, props.validators]);
    const setValue = useCallback((name, value) => {
        setValues((values) => (Object.assign(Object.assign({}, values), { [name]: value })));
    }, []);
    const setError = useCallback((name, error) => {
        setErrors((errors) => (Object.assign(Object.assign({}, errors), { [name]: error })));
    }, []);
    return { values, errors, controllers, setValue, setError };
};

export { isNotEmpty, useForm, validateValue, validateValueAsync };
