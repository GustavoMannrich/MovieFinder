import { ISelectOption } from "./interfaces";

export const sortOptions: ISelectOption[] = [
    { value: 0, label: "Avaliação (maiores primeiro)" },
    { value: 1, label: "Avaliação (menores primeiro)" },
    {
        value: 2,
        label: "Data de lançamento (mais recentes primeiro)",
    },
    { value: 3, label: "Data de lançamento (mais antigos primeiro)" },
    { value: 4, label: "Popularidade atual" },
    { value: 5, label: "Popularidade histórica" },
    { value: 6, label: "Receita gerada (maiores primeiro)" },
    { value: 7, label: "Receita gerada (menores primeiro)" },
];
