import React from 'react';
import './form.module.scss';

export type DataType = {
    fieldName: string;
    type: string;
    value: string;
};

export interface FormData {
    data: DataType[];
    message: string;
    success: boolean;
}

export interface UTFormProps {
    title: string;
    formData: FormData[];
}

const UTForm = ({ title, formData }: UTFormProps) => {
    console.log(formData);

    const renderField = (fieldData: { type: string; fieldName: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal; value: string | number | readonly string[]; }) => {
        if (fieldData.type === 'text') {
            return <>
                <label>{fieldData.fieldName}: </label><br />
                <input type='text' defaultValue={fieldData.value} />
            </>
        } else if (fieldData.type === 'email') {
            return <>
                <label>{fieldData.fieldName}: </label><br />
                <input type='email' defaultValue={fieldData.value} />
            </>
        } else if (fieldData.type === 'multiline') {
            return <>
                <label>{fieldData.fieldName}</label><br />
                <textarea defaultValue={fieldData.value}></textarea>
            </>
        } else if (fieldData.type === 'select') {
            return <>
                <label>{fieldData.fieldName}</label><br />
                <select>{
                    fieldData.options.map((option, index) => {
                        return <option selected={option === fieldData.value} key={index}>{option}</option>
                    })
                }</select>
            </>
        } else if (fieldData.type === 'number') {
            return <>
                <label>{fieldData.fieldName}</label><br />
                <input type='number' defaultValue={fieldData.value} />
            </>
        } else return null;
    }

    const renderForm = (data: any[]) => {
        return data.map((field, index) => {
            return <p key={index}>{renderField(field)}</p>
        })
    }

    if (!formData?.success) return;

    return (
        <article>
            <header>
                <h1>{title}</h1>
            </header>

            <div className='form-wrapper'>{renderForm(formData?.data)}</div>
        </article>
    );
}

export default UTForm;