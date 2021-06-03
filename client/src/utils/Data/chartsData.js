const getRandomColor = () => {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let firstTime = true
let colorList = []
const getColorList = (len) => {

  if (firstTime) {
    firstTime = false
    while (len--)
      colorList.push(getRandomColor())
    return colorList
  }
  else return colorList
}

const getCurrentWeekTime = (userTasks) => {
  const curr = new Date
  const first = curr.getDate() - curr.getDay()
  const firstday = new Date(curr.setDate(first))
  let weekTime = new Array(7).fill(0)
  userTasks.map(task => {
    let taskDate = new Date(parseInt(task.startedAt[0]), parseInt(task.startedAt[1]) - 1, parseInt(task.startedAt[2]), 1, 1, 1, 1)
    if (taskDate >= firstday) {
      weekTime[taskDate.getDay()] = parseFloat((weekTime[taskDate.getDay()] + ((task.time) / 3600000.0)).toFixed(2))
    }
  })
  return weekTime.slice(0, (new Date).getDay() + 1)
}
const getLastWeekTime = (userTasks) => {
  const curr = new Date
  const curr1 = new Date
  const first = (curr.getDate() - curr.getDay()) - 7
  const firstday = new Date(curr.setDate(first))

  const last = (curr1.getDate() - curr1.getDay()) - 1
  const lastday = new Date(curr1.setDate(last))

  let weekTime = new Array(7).fill(0)
  userTasks.map(task => {
    let taskDate = new Date(parseInt(task.startedAt[0]), parseInt(task.startedAt[1]) - 1, parseInt(task.startedAt[2]), 1, 1, 1, 1)
    if (taskDate >= firstday && taskDate <= lastday) {
      weekTime[taskDate.getDay()] = parseFloat((weekTime[taskDate.getDay()] + ((task.time) / 3600000.0)).toFixed(2))

    }
  })
  return weekTime
}
export const doughnutLegends = (user) => {
  let legends = []
  let colorList = getColorList(user.subjects.length)
  for (let i = 0; i < user.subjects.length; i++) {
    legends.push({
      title: user.subjects[i].subjectName,
      color: colorList[i]
    })
  }
  return legends

}

export const doughnutOptions = (user) => {
  let totalTime = 0
  let timePercentList = []
  let subjectList = []
  user.userTasks.map(task => totalTime += task.time)
  user.subjects.map(subject => {
    let subjectTime = 0
    subject.userTasks.map(task => subjectTime += task.time)
    timePercentList.push(((subjectTime / totalTime) * 100).toFixed(2))
    subjectList.push(subject.subjectName)
  })

  return {
    data: {
      datasets: [
        {
          data: timePercentList,
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: getColorList(3),
          label: 'Subjectwise Allocation',
        },
      ],
      labels: subjectList,
    },
    options: {
      responsive: true,
      cutoutPercentage: 60,
    },
    legend: {
      display: false,
    }
  }
}


export const lineLegends = (user) => {
  return [
    { title: 'Last Week', color: '#7F9C7B' },
    { title: 'Current Week', color: '#5367A9' },
  ]
}

export const lineOptions = (user) => {
  return {
    data: {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [
        {
          label: 'Last Week',
          backgroundColor: '#0694a2',
          borderColor: '#0694a2',
          data: getLastWeekTime(user.userTasks),
          fill: false,
        },
        {
          label: 'Current Week',
          fill: false,
          backgroundColor: '#7e3af2',
          borderColor: '#7e3af2',
          data: getCurrentWeekTime(user.userTasks),
        },
      ],
    },
    options: {
      responsive: true,
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true,
      },
      scales: {
        x: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Day',
          },
        },
        y: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value',
          },
        },
      },
    },
    legend: {
      display: false,
    },
  }
}

export const barLegends = [
  { title: 'Shoes', color: 'bg-teal-600' },
  { title: 'Bags', color: 'bg-purple-600' },
]



export const barOptions = {
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Shoes',
        backgroundColor: '#0694a2',
        // borderColor: window.chartColors.red,
        borderWidth: 1,
        data: [-3, 14, 52, 74, 33, 90, 70],
      },
      {
        label: 'Bags',
        backgroundColor: '#7e3af2',
        // borderColor: window.chartColors.blue,
        borderWidth: 1,
        data: [66, 33, 43, 12, 54, 62, 84],
      },
    ],
  },
  options: {
    responsive: true,
  },
  legend: {
    display: false,
  },
}
