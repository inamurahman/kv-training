import './Input.css'

interface Props {
    label: string;
    name: string;
    type: string;
    variant: string;
    placeholder?: string
}

export const Input = (props: Props) => {
    return (
        <div className='input-element'>
            <label className={`label ${props.variant}-label`}>{props.label}</label>
            <input className={`input ${props.variant}-input`} name={props.name} type={props.type}  placeholder={props.placeholder} />
        </div>
    )
}