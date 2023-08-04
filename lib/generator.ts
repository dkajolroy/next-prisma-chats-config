import bcrypt from "bcrypt";
import slugify from "slugify";

export const usernameGenerator = (name: string) => {
    return (
        slugify(name, {
            lower: true,
            replacement: ".",
        }) + (Math.random() * 999).toFixed(0)
    );
};

export async function encryptPassword(password: string) {
    return await bcrypt.hash(password, 10);
}

export async function matchPassword(
    password: string,
    encryptedPassword: string
) {
    return await bcrypt.compare(password, encryptedPassword);
}

export function checkValidEmail(email: string) {
    const pattern = "[a-z0-9]+@[a-z]+.[a-z]{2,3}";
    const result = email.toLocaleLowerCase().match(pattern);
    return !!result;
}
