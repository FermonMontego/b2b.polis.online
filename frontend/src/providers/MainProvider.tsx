'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";

type Props = {} & PropsWithChildren;

const queryClient = new QueryClient()

const MainProvider = (props: Props) => {
    const {children} = props
  return <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>;
};

export default MainProvider;
