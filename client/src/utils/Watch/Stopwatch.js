import React, { useState, Fragment } from "react"
import { connect } from 'react-redux'

import { setIsActive, setTime, setIsPaused, setIsStopped, resetTime } from '../../redux'
import Timer from "./Timer"
import { Pause, PlayArrow, Stop, Timer as TimerIcon } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'


function StopWatch(props) {
  const handleStop = () => {
    props.setIsActive(false)
    props.setIsPaused(false)
    props.setIsStopped(true)
    props.resetTime()
  }
  const ControlButtons = (

    <div>
      {props.isPaused ? (
        <IconButton aria-label="play" className="text-white" onClick={() => { props.setIsActive(true); props.setIsPaused(false) }} >
          <PlayArrow />
        </IconButton>
      ) :
        (
          <IconButton aria-label="pause" className="text-white" onClick={() => { props.setIsActive(false); props.setIsPaused(true) }} >
            <Pause />
          </IconButton>
        )
      }
      <IconButton aria-label="stop" className="text-white" onClick={() => handleStop()} >
        <Stop />
      </IconButton>
    </div>
  )

  return (
    <Fragment>
      {!props.isStopped ?
        (<div className="grid grid-cols-5 gap-4 flex-warp items-center ">
          <div className="row-span-3 ml-2 ">
            <TimerIcon fontSize="large" className="text-white" />
          </div>
          <div className="mt-2 col-span-3 text-2xl font-medium text-white ">{props.taskname}</div>
          <div className="row-span-2 text-2xl font-medium text-white" ><Timer /></div>
          <div className="font-bold col-span-3 row-span-2 text-md text-gray-600 dark:text-gray-200">{props.subject}
            <div className="italic text-xs text-gray-600 dark:text-gray-200">{props.description}</div>
          </div>
          {ControlButtons}
        </div>) :
        (
          'Stopped'
        )
      }
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    isActive: state.timer.isActive,
    isPaused: state.timer.isPaused,
    isStopped: state.timer.isStopped,
    time: state.timer.time
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setIsActive: (val) => dispatch(setIsActive(val)),
    setIsPaused: (val) => dispatch(setIsPaused(val)),
    setIsStopped: (val) => dispatch(setIsStopped(val)),
    setTime: (val) => dispatch(setTime(val)),
    resetTime: () => dispatch(resetTime())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StopWatch)

