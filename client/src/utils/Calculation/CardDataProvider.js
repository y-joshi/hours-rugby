const isDateInThisWeek = (date) => {
    const curr = new Date
    const temp = new Date
    const first = curr.getDate() - curr.getDay()
    const last = first + 6

    const firstday = new Date(curr.setDate(first))
    const lastday = new Date(temp.setDate(last))

    return (date >= firstday && date <= lastday)
}

export const getsubjects = (user) => {
    return user.subjects.length
}

export const getweekTime = (user) => {
    let weekTime = 0
    user.userTasks.map(task => {
        let taskDate = new Date(parseInt(task.startedAt[0]), parseInt(task.startedAt[1]) - 1, parseInt(task.startedAt[2]), 1, 1, 1, 1)
        if (isDateInThisWeek(taskDate.getTime())) {
            weekTime += task.time
        }
    })
    return ("0" + Math.floor((weekTime / 3600000) % 60)).slice(-2) + ":" +
        ("0" + Math.floor((weekTime / 60000) % 60)).slice(-2) + ":" +
        ("0" + Math.floor((weekTime / 1000) % 60)).slice(-2)
}

export const getweekTasks = (user) => {
    let weekTasks = 0
    user.userTasks.map(task => {
        let taskDate = new Date(parseInt(task.startedAt[0]), parseInt(task.startedAt[1]) - 1, parseInt(task.startedAt[2]), 1, 1, 1, 1)
        if (isDateInThisWeek(taskDate.getTime())) {
            weekTasks++
        }
    })
    return weekTasks
}

export const getmaxTimeWeek = (user) => {
    let maxTimeWeek = 0
    user.userTasks.map(task => {
        let taskDate = new Date(parseInt(task.startedAt[0]), parseInt(task.startedAt[1]) - 1, parseInt(task.startedAt[2]), 1, 1, 1, 1)
        if (isDateInThisWeek(taskDate.getTime())) {
            if (task.time > maxTimeWeek) maxTimeWeek = task.time
        }
    })
    return ("0" + Math.floor((maxTimeWeek / 3600000) % 60)).slice(-2) + ":" +
        ("0" + Math.floor((maxTimeWeek / 60000) % 60)).slice(-2) + ":" +
        ("0" + Math.floor((maxTimeWeek / 1000) % 60)).slice(-2)
}