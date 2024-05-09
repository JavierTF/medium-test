import { SxProps, SystemProps } from '@mui/system';

export interface DynamicButtonProps {
    icon?: React.ReactNode;
    text: string;
    disabled?: boolean;
    filled?: boolean;
    url?: string | null;
    primary?: boolean;
    disabledAll?: boolean;
    actionButton?: string;
}

export interface StringTypographyProps {
    text: string;
    sx?: SxProps;
}

export interface InputGroupProps {
    handleClick: () => void;
    colored: boolean;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    created_at: string;
    finished_at: string | null;
}
  
export interface MyCardProps {
    tasks: Task[];
}

export interface TaskContext {
    tasks: Task[];
    emailCountRef?: number;
    linkCountRef?: number;
    titleTask?: string;
    openDialog: boolean;
    action: string;
    idTask?: string;
}