import React, { PropsWithChildren } from 'react';

type Props = {} & PropsWithChildren;

const Default = (props: Props) => {
    const { children } = props;
    return (
        <div className="container mx-auto flex flex-col gap-8 p-5">
            {children}
        </div>
    );
};

export default Default;
