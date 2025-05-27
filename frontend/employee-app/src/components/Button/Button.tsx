import './Button.css'

interface Props {
    text: string;
    variant: string;
    className: string;
    type: "submit" | "reset" | "button" | undefined;
}

export const Button = (props: Props) => {
    return (
        <button className={`button button--${props.variant} ${props.className}`} type={props.type}>{props.text}</button>
    )
}