import React from 'react';
import Style from './input.module.scss'

export const UiInput = (
    {   className,
        onChange,
        onFocus,
        onBlur,
        value,
        type,
        placeholder,
        required,
        ...props
    }) => 
{
    var classes = [Style.input,className].join(" ")
    return (
        <input
            onChange={(onChange)&&(e => onChange(e))}
            value={value}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            required={required}
            {...props}
            type={type}
            className={classes}
        />
    );
};