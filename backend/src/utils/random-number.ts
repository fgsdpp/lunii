/**
 * Return a random number between min and max value
 */
export const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (Math.max(max, min) - Math.min(min, max) + 1)) + min;
}