import './SelectComponent.css'

interface Props {
    label: string
    name: string;
    options: {
        key: number;
        value: string;
    }[];
}

export const SelectComponent = (props: Props) => {
    return (
        <div className="form-element">
            <label>{props.label}</label>
            <select name={props.name}>
                {props.options.map((option) => (
                    <option key={option.key} value={option.key}>{option.value}</option>
                ))}
            </select>
        </div>
    )
}