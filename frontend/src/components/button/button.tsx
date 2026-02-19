import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

type Props = {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isLink?: boolean;
    href?: string;
    disabled?: boolean;
    type?: "submit" | "reset" | "button" | undefined
} & PropsWithChildren;

const Button = (props: Props) => {
    const { children, onClick, isLink, href, disabled, type } = props;

    const className = isLink
        ? `w-max cursor-pointer border px-4 py-2 text-black hover:bg-gray-100 transition`
        : `w-max cursor-pointer bg-blue-400 px-4 py-2 text-white hover:bg-blue-300 transition disabled:opacity-75`;

    if (isLink)
        return (
            <Link className={className} href={href as string}>
                {children}
            </Link>
        );

    return (
        <button className={className} onClick={onClick} disabled={disabled} type={type}>
            {children}
        </button>
    );
};

export default Button;
