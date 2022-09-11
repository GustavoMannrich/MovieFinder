import Select, {
    GroupBase,
    MultiValue,
    OptionsOrGroups,
    PropsValue,
    SingleValue,
} from "react-select";
import { ISelectOption } from "../../../utils/interfaces";

interface CustomSelectProps {
    placeholder: string;
    value: PropsValue<ISelectOption>;
    options: OptionsOrGroups<ISelectOption, GroupBase<ISelectOption>>;
    isMulti?: boolean;
    zIndex: number;
    onChange: (
        value: MultiValue<ISelectOption> | SingleValue<ISelectOption>
    ) => void;
}

const CustomSelect = ({
    placeholder,
    value,
    options,
    isMulti = false,
    zIndex,
    onChange,
}: CustomSelectProps) => {
    return (
        <Select
            onChange={onChange}
            placeholder={placeholder}
            className="mt-1 mb-1"
            noOptionsMessage={() => "Nada encontrado"}
            value={value}
            options={options}
            isMulti={isMulti}
            styles={{
                container: (base) => ({
                    ...base,
                    zIndex: zIndex,
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
                    color: "white",
                    ":hover": {
                        backgroundColor: "white",
                    },
                }),
            }}
        />
    );
};

export default CustomSelect;
