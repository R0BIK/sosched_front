// import { useState, useEffect, useCallback } from 'react';
// import { getSignFormData } from "../constants/constants.js";
// import { SIGN_FORM_CHECK } from '../Regex/regexPatterns.js'
// import { useTranslation } from "react-i18next";

// export function useSessionStorage(groupKey, valueKey, isSaving, initialValue="") {
//     const [values, setValue] = useState(() => {
//         const saved = sessionStorage.getItem(groupKey);
//         if (saved) {
//             const parsed = JSON.parse(saved);
//             return parsed[valueKey] || initialValue;
//         }
//         return initialValue;
//     });
//
//     useEffect(() => {
//         const savedFormData = sessionStorage.getItem(groupKey);
//         const newValues = savedFormData ? JSON.parse(savedFormData) : {};
//
//         newValues[valueKey] = isSaving ? values : "";
//
//         sessionStorage.setItem(groupKey, JSON.stringify(newValues));
//     }, [groupKey, valueKey, values, isSaving]);
//
//     const handleChange = (e) => {
//         const { value } = e.target;
//         setValue(value);
//     }
//
//     return { values, handleChange }
// }

// export function useValidateForm( props = {} ) {
//     const {
//         initialErrors = {},
//         inputRefs,
//         formFields
//     } = props;
//
//     const { t } = useTranslation();
//     const SignFormData = getSignFormData(t);
//
//     const [errors, setErrors] = useState(initialErrors);
//
//     const validateField = useCallback((name, value) => {
//         let error = "";
//         let isError = false;
//
//         Object.entries(SignFormData.FIELDS).forEach(([key, values]) => {
//             console.log(key);
//
//             if (name === values.name && value) {
//                 if (!SIGN_FORM_CHECK[key]?.test(value.trim())) {
//                     error = SignFormData.ERRORS[key]
//                     isError = true;
//                 }
//             }
//         })
//
//         return { error, isError };
//     }, [SignFormData.ERRORS, SignFormData.FIELDS])
//
//     const activateError = useCallback((name, isError) => {
//         formFields.forEach((fieldKey, index) => {
//             if (SignFormData.FIELDS[fieldKey].name === name) {
//                 const input = inputRefs.current[index];
//
//                 input.toggleAttribute("data-error", isError);
//             }
//         });
//     }, [SignFormData.FIELDS, formFields, inputRefs])
//
//     const inputOnBlur = useCallback((name, value) => {
//         const { error, isError } = validateField(name, value);
//         activateError(name, isError);
//         if (isError) setErrors(prev => ({ ...prev, [name]: error }));
//
//     }, [validateField, activateError])
//
//     const handleSubmit = useCallback((e) => {
//         e.preventDefault();
//         document.activeElement.blur();
//         let newErrors = {};
//
//         formFields.forEach((fieldKey, index) => {
//             const inputElement = inputRefs.current[index];
//             if (inputElement) {
//                 if (!inputElement.value.trim()) {
//                     newErrors[inputElement.name] = "Поле не може бути пустим.";
//                     activateError(inputElement.name, true);
//                 } else {
//                     const { error, isError} = validateField(inputElement.name, inputElement.value);
//                     newErrors[inputElement.name] = error;
//                     activateError(inputElement.name, isError);
//                 }
//             }
//         });
//
//         setErrors(newErrors);
//
//         return newErrors;
//     }, [formFields, inputRefs, validateField, activateError])
//
//     return { errors, inputOnBlur, handleSubmit };
// }
