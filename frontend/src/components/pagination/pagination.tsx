import { Article } from '@/src/types';
import { LaravelPagination } from '@/src/types/pagination';
import React, { FC } from 'react';

type Props = {
    meta: LaravelPagination<Article>;
    onPageChange: (page: number) => void;
};

export const Pagination: FC<Props> = ({ meta, onPageChange }) => {
    if (!meta || meta.last_page <= 1) return null;

    return (
        <nav
            className="mt-12 flex items-center justify-center space-x-2"
            aria-label="Pagination"
        >
            <button
                onClick={() => onPageChange(meta.current_page - 1)}
                disabled={meta.current_page === 1}
                className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>

            <div className="hidden items-center space-x-1 sm:flex">
                {meta.links.map((link, index) => {
                    if (index === 0 || index === meta.links.length - 1)
                        return null;

                    const isDots = link.url === null && !link.active;
                    const isPage = !!link.url || link.active;

                    if (isDots) {
                        return (
                            <span
                                key={index}
                                className="px-3 py-2 text-slate-400"
                            >
                                ...
                            </span>
                        );
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => onPageChange(Number(link.label))}
                            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                                link.active
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                                    : 'border border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-100'
                            }`}
                        >
                            {link.label}
                        </button>
                    );
                })}
            </div>

            <button
                onClick={() => onPageChange(meta.current_page + 1)}
                disabled={meta.current_page === meta.last_page}
                className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>
        </nav>
    );
};
