import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { router } from '@inertiajs/react';
import { PaginationProps } from '@/types/props';

export default function Pagination<T>({ paginatedData }: PaginationProps<T>) {
    const changePage = (page: number) => {
        router.get(
            window.location.pathname,
            {
                page,
            },
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    return (
        <div className="flex w-full max-w-[280px] items-center justify-between gap-2">
            <div className="flex items-center">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span>
                            {paginatedData.current_page == 1 ? (
                                <button
                                    type="button"
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background/70 text-muted-foreground/70 shadow-sm transition-colors disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-border/60 dark:bg-background/40"
                                    disabled
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() =>
                                        changePage(
                                            paginatedData.current_page - 1,
                                        )
                                    }
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background/70 text-muted-foreground/80 shadow-sm transition-colors hover:border-border hover:bg-accent/70 hover:text-foreground dark:border-border/60 dark:bg-background/40 dark:hover:bg-accent/20"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                            )}
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>Poprzednia strona</TooltipContent>
                </Tooltip>
            </div>

            <span className="min-w-[6.5rem] flex-1 text-center text-[10px] font-medium tracking-[0.2em] text-muted-foreground/80 uppercase">
                Strona {paginatedData.current_page} z {paginatedData.last_page}
            </span>

            <div className="flex items-center">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span>
                            {paginatedData.current_page ==
                            paginatedData.last_page ? (
                                <button
                                    type="button"
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background/70 text-muted-foreground/70 shadow-sm transition-colors disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-border/60 dark:bg-background/40"
                                    disabled
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() =>
                                        changePage(
                                            paginatedData.current_page + 1,
                                        )
                                    }
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background/70 text-muted-foreground/80 shadow-sm transition-colors hover:border-border hover:bg-accent/70 hover:text-foreground dark:border-border/60 dark:bg-background/40 dark:hover:bg-accent/20"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            )}
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>Następna strona</TooltipContent>
                </Tooltip>
            </div>
        </div>
    );
}
