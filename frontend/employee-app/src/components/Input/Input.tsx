import type { ChangeEvent } from "react";
import "./Input.css";
import type React from "react";

interface Props {
  label: string;
  id?: string;
  name: string;
  type: string;
  variant: string;
  placeholder?: string;
  value?: string;
  onchange?: (event: ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.Ref<HTMLInputElement>;
  endAdornment?: React.ReactNode;
  disabled?: boolean;
}

export const Input = (props: Props) => {
  return (
    <div className="input-element">
      <div className={`${props.variant}div`}>
        <label className={`label ${props.variant}-label`} htmlFor={props.id}>{props.label}</label>
        <input
          className={`input ${props.variant}-input`}
          id={props.id}
          name={props.name}
          type={props.type}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onchange}
          ref={props.inputRef}
          disabled={props.disabled}
          required
        />
        {props.endAdornment ? props.endAdornment : null}
      </div>
    </div>
  );
  
};
