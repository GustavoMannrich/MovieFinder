export const isNumber = (str: string): boolean => {
    if (typeof str !== "string") {
        return false;
    }

    if (str.trim() === "") {
        return false;
    }

    return !Number.isNaN(Number(str));
};

export const formatDateStr = (date: string) => {
    let datePart: RegExpMatchArray | null = date.match(/\d+/g);
    let year = "";
    let month = "";
    let day = "";

    if (datePart) {
        year = datePart[0];
        month = datePart[1];
        day = datePart[2];
    }

    return day + "/" + month + "/" + year;
};

export const priceSplitter = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const convertMinutes = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) {
        return `${minutes}m`;
    }

    return `${hours}h e ${minutes}m`;
};

const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, "0");
};

export const formatDate = (date: Date) => {
    let d = new Date(date);

    return [
        padTo2Digits(d.getDate()),
        padTo2Digits(d.getMonth() + 1),
        d.getFullYear(),
    ].join("/");
};

export const dataAAAAMMDD = (date: Date) => {
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join("-");
};
