export const propsLength = (object) => {
    try {
        return Object.keys(object).length;
    } catch (e) {
        return console.log(e);
    }
}