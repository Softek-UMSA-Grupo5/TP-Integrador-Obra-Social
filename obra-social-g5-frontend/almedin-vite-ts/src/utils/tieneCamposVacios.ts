export default function tieneCamposVacios(json: Object) {
    const errors: string[] = [];

    Object.keys(json).map((key) => (json[key] == false ? errors.push(key) : null));

    return errors;
}
