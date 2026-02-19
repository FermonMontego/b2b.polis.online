import React, { ChangeEvent } from 'react';

type Props = {
    type?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    value?: string;
    name: string;
};

const Input = (props: Props) => {
    const { onChange, placeholder = 'Введите текст', value } = props;

    return (
        <input
            className="border p-2 outline-0"
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            {...props}
        />
    );
};

export default Input;
