export const isValidEmail = (value: string | null | undefined): boolean => {
    if (!value) return false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}