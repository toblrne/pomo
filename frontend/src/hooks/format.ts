export const format = (time: number) => {
    let minutes: number | string = Math.floor(time / 60)
    let seconds: number | string = Math.floor(time - minutes * 60)

    if (minutes <= 10) minutes = '0' + minutes
    if (seconds <= 10) seconds = '0' + seconds
    return minutes + ":" + seconds
}