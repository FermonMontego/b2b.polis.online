import React from 'react';

type Props = {
    placeholder?: string;
    name: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const Textarea = (props: Props) => {
    const { placeholder, value, onChange } = props;
    return (
        <textarea
            className="border p-2 outline-0"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...props}
        ></textarea>
    );
};

export default Textarea;
