import { useState, useEffect } from 'react';

export default function useForm(submitHandler, initialValues) {
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        setValues(initialValues);
    }, [initialValues]);

    const onChange = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };


    const onSubmit = (e) => {
        e.preventDefault();

        const trimedValues =  Object.entries(values).reduce((acc, inputField) => {                                         // Using Object.entries to process each key-value pair in the input object
            const [inputFieldName, inputFieldValue] = inputField;

            if (inputFieldValue === '') {                                                               // If the value of the input field is an empty string, skip it in the result
                return acc;
            }

            return { ...acc, [inputFieldName]: typeof inputFieldValue === 'string' ? inputFieldValue.trim() : inputFieldValue };
        }, {});


        submitHandler(trimedValues);
    };

    return {
        values,
        onChange,
        onSubmit,
    };
}