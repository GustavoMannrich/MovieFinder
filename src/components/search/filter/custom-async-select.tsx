import {
    ContainerProps,
    CSSObjectWithLabel,
    GroupBase,
    MultiValue,
    PropsValue,
    SingleValue,
} from "react-select";
import AsyncSelect from "react-select/async";
import { SelectComponents } from "react-select/dist/declarations/src/components";
import { StylesConfigFunction } from "react-select/dist/declarations/src/styles";
import { ISelectOption } from "../../../utils/interfaces";

interface CustomAsyncSelectProps {
    placeholder: string;
    value?: PropsValue<ISelectOption>;
    loadOptions: (keyword: string) => Promise<any[]>;
    zIndex: number;
    isMulti: boolean;
    components?:
        | Partial<SelectComponents<any, boolean, GroupBase<any>>>
        | undefined;
    containerStyle?: CSSObjectWithLabel;
    inputStyle?: CSSObjectWithLabel;
    dropdownIndicatorStyle?: CSSObjectWithLabel;
    onChange: (
        value: MultiValue<ISelectOption> | SingleValue<ISelectOption>
    ) => void;
}

const CustomAsyncSelect = ({
    placeholder,
    value,
    loadOptions,
    zIndex,
    isMulti,
    components,
    containerStyle,
    inputStyle,
    dropdownIndicatorStyle,
    onChange,
}: CustomAsyncSelectProps) => {
    return (
        <AsyncSelect
            placeholder={placeholder}
            className="mt-1 mb-1"
            noOptionsMessage={() => "Nada encontrado"}
            onChange={onChange}
            cacheOptions
            loadOptions={loadOptions}
            defaultOptions
            loadingMessage={() => "Buscando..."}
            isMulti={isMulti}
            value={value}
            components={components}
            styles={{
                input: (base) => ({
                    ...base,
                    cursor: "text",
                    ...inputStyle,
                }),
                container: (base) => ({
                    ...base,
                    zIndex: zIndex,
                    ...containerStyle,
                }),
                valueContainer: (base) => ({
                    ...base,
                    padding: "3px",
                }),
                menu: (base) => ({
                    ...base,
                    color: "white",
                    backgroundColor: "black",
                    border: "2px solid rgb(57, 192, 237)",
                }),
                noOptionsMessage: (base) => ({
                    ...base,
                    color: "white",
                }),
                placeholder: (base) => ({
                    ...base,
                    color: "white",
                }),
                option: (base) => ({
                    ...base,
                    ":hover": {
                        backgroundColor: "rgba(57, 192, 237, 0.5)",
                    },
                }),
                multiValue: (base) => ({
                    ...base,
                    backgroundColor: "rgba(57, 192, 237, 0.8)",
                }),
                multiValueLabel: (base) => ({
                    ...base,
                    color: "white",
                }),
                multiValueRemove: (base) => ({
                    ...base,
                    ":hover": {
                        backgroundColor: "white",
                    },
                }),
                dropdownIndicator: (base) => ({
                    ...base,
                    ...dropdownIndicatorStyle,
                }),
            }}
        />
    );
};

export default CustomAsyncSelect;
