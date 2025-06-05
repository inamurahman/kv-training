import type { ChangeEvent } from 'react';
import './SelectComponent.css'

interface Props {
    label: string
    name: string;
    value? : string | number;
    defaultValue?: string | number;
    onchange? : (event:ChangeEvent<HTMLSelectElement>) => void;
    options: {
        value: number | string;
        name: string
    }[];
}

export const SelectComponent = (props: Props) => {
    return (
        <div className="form-element">
            <label>{props.label}</label>
            <select name={props.name} onChange={props.onchange} value={props.value} defaultValue={props.defaultValue || ''} required>
                <option value={props.defaultValue!=undefined ? props.defaultValue : ""} disabled>{props.label}</option>
                {props.options.map((option) => (
                    <option value={option.value}>{option.name}</option>
                ))}
            </select>
        </div>
    )
}