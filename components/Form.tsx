import React, { useEffect, useState } from 'react';
import { useUpdateFormData } from '../hooks/use-update-form-data';
import ListItem from './ListItem';

export type DataType = {
    fieldName: string;
    type: string;
    value: string;
    firstName?: string;
    lastName?: string;
    emailAddress?: string;
    gender?: string;
    age?: number;
    testimonial?: string;
};

export interface FormData {
    data: DataType[];
    message: string;
    success: boolean;
}

export interface FormProps {
    title: string;
    formData: FormData[];
}

const Form = ({ title, formData }: FormProps) => {
    const [utFormData, setUtFormData] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        gender: '',
        age: undefined,
        testimonial: ''
    });

    useEffect(() => setUtFormData(
        oldValues => (
            {
                ...oldValues,
                firstName: formData?.data.find((item: { fieldName: string; }) => item.fieldName === 'firstName')?.value,
                lastName: formData?.data.find((item: { fieldName: string; }) => item.fieldName === 'lastName')?.value,
                emailAddress: formData?.data.find((item: { fieldName: string; }) => item.fieldName === 'emailAddress')?.value,
                gender: formData?.data.find((item: { fieldName: string; }) => item.fieldName === 'gender')?.value,
                age: formData?.data.find((item: { fieldName: string; }) => item.fieldName === 'age')?.value,
                testimonial: formData?.data.find((item: { fieldName: string; }) => item.fieldName === 'testimonial')?.value
            }
        )
      ), [formData]);

    const renderField = (fieldData: { type: string; fieldName: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal; value: string | number | readonly string[]; }) => {
        if (fieldData.fieldName === 'firstName') {
            return <>
                <label htmlFor='firstName'>{fieldData.fieldName}: </label><br />
                <input name='firstName' onChange={handleOnChange} type='text' defaultValue={fieldData.value} />
            </>
        } else if (fieldData.fieldName === 'lastName') {
            return <>
                <label htmlFor='lastName'>{fieldData.fieldName}: </label><br />
                <input name='lastName' onChange={handleOnChange} type='text' defaultValue={fieldData.value} />
            </>
        } else if (fieldData.type === 'email') {
            return <>
                <label>{fieldData.fieldName}: </label><br />
                <input name={fieldData.fieldName.toString()} onChange={handleOnChange} type='email' defaultValue={fieldData.value} />
            </>
        } else if (fieldData.type === 'multiline') {
            return <>
                <label>{fieldData.fieldName}</label><br />
                <textarea name={fieldData.fieldName.toString()} onChange={handleOnChange} defaultValue={fieldData.value}></textarea>
            </>
        } else if (fieldData.type === 'select') {
            return <>
                <label>{fieldData.fieldName}</label><br />
                <select name={fieldData.fieldName.toString()} onChange={handleOnChange} defaultValue={fieldData.value}>{
                    fieldData.options.map((option, index) => {
                        return <option key={index}>{option}</option>
                    })
                }</select>
            </>
        } else if (fieldData.type === 'number') {
            return <>
                <label>{fieldData.fieldName}</label><br />
                <input name={fieldData.fieldName.toString()} onChange={handleOnChange} type='number' defaultValue={fieldData.value} />
            </>
        } else return null;
    }
    

    const renderForm = (data: any[]) => {
        return data.map((field, index) => {
            return <li key={index}>{renderField(field)}</li>
        })
    }

    const handleOnChange = (e: { target: { name: any; value: string; }; }) => {
        console.log(formData, utFormData, e.target.name, e.target.value.trim());
        setUtFormData({
            ...utFormData,
            [e.target.name]: e.target.value.trim()
        });
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        useUpdateFormData(utFormData).then((data) => {
            console.log(data);
        });
    }

    if (!formData?.success) return;

    return (
        <article>
            <header>
                <h1>{title}</h1>
            </header>

            <ul className='form-wrapper'>{renderForm(formData?.data)}</ul>

            <footer>
                <button onClick={handleSubmit}>Submit</button>
            </footer>
        </article>
    );
}

export default Form;