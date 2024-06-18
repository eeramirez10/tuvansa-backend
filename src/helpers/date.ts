const date = new Date()

export const getCurrentYear = () => `${date.getFullYear()}`

export const getCurrentMonth = () => `${date.getMonth() + 1}`

export const getCurrentDay = () => `${date.getDate()}`;


export const getFullCurrentDate = () => {
  return `${getCurrentYear()}-${getCurrentMonth()}-${getCurrentDay()}`
}

export const getLastDayOfMonth = (year, month) => {
  const fecha = new Date(parseInt(year), parseInt(month), 1);
  fecha.setDate(fecha.getDate() - 1);
  return fecha.getDate();
}
