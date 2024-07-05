export const validateEmptyField = (json: Object | array) => {
    const errors: string[] = [];

    Object.keys(json).map((key) => (json[key] == false ? errors.push(key) : null));

    return errors;
}

export const validateStringField = (value:string, min:number, max:number) => {
    return (value.length >= min && value.length <= max);
}

export const validateNumberField = (value:number, min:number, max:number) => {
    return (value >= min && value <= max);
}