import React, { useContext, Suspense, useEffect, lazy, useState } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import routes from '../routes'
import { connect } from 'react-redux'
import { setIsActive, setTime, setIsPaused, setIsStopped, setUser } from '../redux'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Main from '../containers/Main'
import ThemedSuspense from '../components/ThemedSuspense'
import { SidebarContext } from '../context/SidebarContext'
import axios from 'axios'

const Page404 = lazy(() => import('../pages/404'))

function Layout(props) {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
  const [validToken, setValidToken] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  let location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token === undefined) {
      setValidToken(false)
      setIsLoading(false)
    }
    else {
      axios.get(process.env.REACT_APP_API_URL + "auth", {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
        .then(res => {
          console.log(res);
          props.setUser(res.data.user)
          setValidToken(true)
          setIsLoading(false)
        })
        .catch(error => {
          console.log(error)
          setValidToken(false)
          setIsLoading(false)
        })
    }

    let interval = null;

    if (props.isStopped === false && props.isPaused === false) {
      interval = setInterval(() => {
        props.setTime(1000)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => {
      clearInterval(interval)
    }

    closeSidebar()
  }, [location, props.isActive, props.isPaused])

  return (
    <React.Fragment>
      { isLoading && <ThemedSuspense />}
      { !isLoading && !validToken &&
        <Redirect exact from="/app" to="/login" />
      }
      { !isLoading && validToken &&
        <div
          className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}
        >
          <Sidebar />

          <div className="flex flex-col flex-1 w-full">
            <Header />
            <Main>
              <Suspense fallback={<ThemedSuspense />}>
                <Switch>
                  {routes.map((route, i) => {
                    return route.component ? (
                      <Route
                        key={i}
                        exact={true}
                        path={`/app${route.path}`}
                        render={(props) => <route.component {...props} />}
                      />
                    ) : null
                  })}
                  <Redirect exact from="/app" to="/app/dashboard" />
                  <Route component={Page404} />
                </Switch>
              </Suspense>
            </Main>
          </div>
        </div>
      }

    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    isActive: state.timer.isActive,
    isPaused: state.timer.isPaused,
    isStopped: state.timer.isStopped,
    time: state.timer.time,
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setIsActive: (val) => dispatch(setIsActive(val)),
    setIsPaused: (val) => dispatch(setIsPaused(val)),
    setIsStopped: (val) => dispatch(setIsStopped(val)),
    setTime: (val) => dispatch(setTime(val)),
    setUser: (val) => dispatch(setUser(val))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout)

