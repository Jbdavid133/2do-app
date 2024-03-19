export interface FormPropsTypes<T> {
    className?: string;
    onSubmit: ($event: T) => void;
}