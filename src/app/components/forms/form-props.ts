export interface FormProps<T> {
    className?: string;
    onSubmit: ($event: T) => void;
}