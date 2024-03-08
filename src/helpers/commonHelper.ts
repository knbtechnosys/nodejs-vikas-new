export const getRoom = (u1: any, u2: any) => {
    return (+u1 < +u2) ? `${u1}${u2}` : `${u2}${u1}`;
}