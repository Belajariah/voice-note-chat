const timerFormattter = (time) => {
  const data = time.split(':')
  const resultTime = `${data[0]}:${data[1]}`

  return resultTime
}
