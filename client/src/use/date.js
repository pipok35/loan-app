const formatter = new Intl.DateTimeFormat('ru-RU')

export function date(value) {
  return formatter.format(value)
}
