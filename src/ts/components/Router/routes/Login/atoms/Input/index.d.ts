export interface IInputProps {
    placeholder: string;
    onInputChange: (updatedValue) => void;
    hasError: boolean;
    type: string;
    id?: string;
}
