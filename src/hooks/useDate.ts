export const useDate = (date: Date) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  yesterday.setHours(0, 0, 0, 0)

  const dayBeforeYesterday = new Date()
  dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2)
  dayBeforeYesterday.setHours(0, 0, 0, 0)

  if (date >= today) {
    return "Сегодня"
  } else if (date >= yesterday) {
    return "Вчера"
  } else if (date >= dayBeforeYesterday) {
    return "Позавчера"
  } else {
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
  }
}
