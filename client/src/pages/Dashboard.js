import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import axios from 'axios'
import { setIsActive, setIsStopped, setUser } from '../redux'
import InfoCard from '../components/Cards/InfoCard'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon, FormsIcon, HeartIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import { PlayArrowRounded, AlarmOn, LocalPlay, CheckCircle, LibraryBooks, Add, Timer } from '@material-ui/icons'
import { getweekTime, getweekTasks, getmaxTimeWeek, getsubjects } from '../utils/Calculation/CardDataProvider'
import {
  Input, Textarea, Label, HelperText, Select, Modal, ModalBody, ModalFooter, ModalHeader, Button, Card, CardBody
} from '@windmill/react-ui'

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../utils/demo/chartsData'
import StopWatch from '../utils/Watch/Stopwatch'
import { setTask } from '../redux/startedTask/taskActions'

function Dashboard(props) {
  const [addSubject, setAddSubject] = useState('')
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false)
  const [startedTask, setStartedTask] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [subjectID, setSubjectID] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [clearTask, setClearTask] = useState(false)
  const [cardData, setCardData] = useState({})

  useEffect(() => {
    if (props.isTimerStopped === false) {
      if (clearTask) {
        setStartedTask('')
        setSelectedSubject('')
        setTaskDescription('')
        setSubjectID('')
      }
      setClearTask(true)
    }
  }, [cardData])

  const handleSelectSubject = (event) => {
    if (event.target.value === "addSubject") {
      event.target.value = null
      setIsSubjectModalOpen(true)
    }
    else {
      setSelectedSubject(event.target.value)
      const selectedIndex = event.target.options.selectedIndex;
      setSubjectID(event.target.options[selectedIndex].getAttribute('data-key'))
    }
  }

  const handleAddSubject = (event) => {
    if (addSubject.trim() !== '') {
      let subject = addSubject.trim()

      const request = JSON.stringify({
        "subject": subject
      })

      axios.post(process.env.REACT_APP_API_URL + "addSubject", request, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      })
        .then(res => {
          props.setUser(res.data.user)
          setAddSubject('')
        })
        .catch(err => { console.log(err) })

      setIsSubjectModalOpen(false)
    }
  }

  const handleStartTimer = () => {
    let task = {
      name: startedTask,
      subject: selectedSubject,
      subjectId: subjectID,
      description: taskDescription,
      startedAt: Date.now(),
      endedAt: null
    }
    props.setTask(task)
    setIsTaskModalOpen(false)
    props.setTimerIsActive(true)
    props.setTimerIsStopped(false)
  }

  return (
    <React.Fragment>
      {props.isTimerStopped ?
        (<div className="mt-6 ml-2 mb-6 btn-success">
          <Button iconRight={Add} size="large" onClick={() => setIsTaskModalOpen(true)}> Start A Task </Button>
        </div>) :
        (
          <Card colored className="w-full mt-6  mb-6 text-white bg-blue-400 dark:bg-green-600 flex-wrap items-center">
            <CardBody>
              <StopWatch taskname={props.task.name} subject={props.task.subject} description={props.task.description} />
            </CardBody>
          </Card>

        )
      }

      <Modal isOpen={isTaskModalOpen} onClose={() => { setIsTaskModalOpen(false) }}>
        <ModalHeader> Start a Task</ModalHeader>
        <ModalBody>
          <div className="mb-8 bg-white  dark:bg-gray-800">
            <Label>
              <div className="relative mt-4 text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <input
                  className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder="Enter task name e.g. Chapter 5 Biodiversity"
                  value={startedTask}
                  onChange={(e) => setStartedTask(e.target.value)}
                />
                <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                  <FormsIcon className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>
            </Label>

            <Label className="mt-4">
              <Select className="relative mt-4 text-gray-500 focus-within:text-black dark:focus-within:text-white" onClick={handleSelectSubject} placeholder="Hello">
                <option hidden>Select Subject</option>

                {props.user.subjects.map(subject => <option key={subject.id} data-key={subject.id}>{subject.subjectName} </option>)}

                <option className="bg-green-300 dark:bg-green-800" value="addSubject">+ Add new Subject</option>
              </Select>
            </Label>

            <Label className="mt-4">
              <Textarea className="mt-1" rows="3" placeholder="Description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
            </Label>

          </div>
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button iconRight={PlayArrowRounded} onClick={handleStartTimer}>
              Start
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" iconRight={PlayArrowRounded} onClick={handleStartTimer}>
              Start
            </Button>
          </div>
        </ModalFooter>
      </Modal>
      <Modal isOpen={isSubjectModalOpen} onClose={() => setIsSubjectModalOpen(false)}>
        <ModalHeader>Add new Subject</ModalHeader>
        <ModalBody>
          <Label>
            <div className="relative mt-4 text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
              <input
                className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                placeholder="Enter Subject Name"
                value={addSubject}
                onChange={e => setAddSubject(e.target.value)}
              />
              <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                <LibraryBooks className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
          </Label>
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button onClick={handleAddSubject}>Add</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" onClick={handleAddSubject}>Add</Button>
          </div>
        </ModalFooter>
      </Modal>


      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Subjects" value={getsubjects(props.user)}>
          <RoundIcon
            icon={LibraryBooks}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
          />
        </InfoCard>

        <InfoCard title="This Week Time" value={getweekTime(props.user)}>
          <RoundIcon
            icon={Timer}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
          />
        </InfoCard>

        <InfoCard title="Tasks in Week" value={getweekTasks(props.user)}>
          <RoundIcon
            icon={CheckCircle}
            iconColorClass="text-teal-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
          />
        </InfoCard>

        <InfoCard title="Max Time in Week" value={getmaxTimeWeek(props.user)}>
          <RoundIcon
            icon={LocalPlay}
            iconColorClass="text-yellow-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
          />
        </InfoCard>
      </div>

      <PageTitle>Performance</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Time Allocation">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="This Week">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
      </div>
    </React.Fragment>
  )
}
const mapStateToProps = state => {
  return {
    isTimerActive: state.timer.isActive,
    isTimerStopped: state.timer.isStopped,
    isTimerPaused: state.timer.isPaused,

    user: state.user.user,

    task: state.startedTask.task
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setTimerIsActive: (val) => dispatch(setIsActive(val)),
    setTimerIsStopped: (val) => dispatch(setIsStopped(val)),
    setUser: (val) => dispatch(setUser(val)),
    setTask: (val) => dispatch(setTask(val))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
