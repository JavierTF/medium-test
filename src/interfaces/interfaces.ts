export interface DynamicButtonProps {
    icon?: React.ReactNode;
    text: string;
    disabled?: boolean;
    filled?: boolean;
    url?: string | null;
    primary?: boolean;
    disabledAll?: boolean;
}

export interface StringTypographyProps {
    text: string;
}

export interface InputGroupProps {
    handleClick: () => void;
    colored: boolean;
}

export interface Task {
    id: number;
    title: string;
    description: string;
    created_at: string;
    finished_at: string | null;
}
  
export interface MyCardProps {
    tasks: Task[];
}