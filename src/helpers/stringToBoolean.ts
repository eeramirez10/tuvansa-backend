export const stringToBoolean = (str: string): boolean => {

  return ["true", "1", "yes", "on"].includes(str.toLowerCase())
}