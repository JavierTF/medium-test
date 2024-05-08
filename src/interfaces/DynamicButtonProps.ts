export interface DynamicButtonProps {
    icon?: React.ReactNode;
    text: string;
    disabled?: boolean;
    filled?: boolean;
    url?: string | null;
    primary?: boolean;
    disabledAll?: boolean;
}