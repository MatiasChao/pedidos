import React, { useState, useReducer, Fragment } from 'react'
import axios from 'axios'
import LoadingOverlay from 'react-loading-overlay'
import LoginReducer from './LoginReducer'
import { ERROR_LOGIN } from "../../constans"

const Login = (props) => { 

    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    const { email, password } = user

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const [state, dispatch] = useReducer(LoginReducer, {
        error: false,
        message: ''
    })

    const login = e => {
        e.preventDefault()

        if(email.trim() === '' || password.trim() === '') {
            dispatch({ type: ERROR_LOGIN, message: 'El email y/o password no pueden ser vacios' })
            return
        }

        setLoading(true)

        const url = 'http://localhost:4000/api/auth/user'

        axios.post(url, {
            email: email,
            password: password
          })
          .then(function (response) {
            localStorage.setItem('user-token', response.data.access_token)
            props.history.push('/home') 
            setLoading(false)
          })
          .catch(function (error) {
            dispatch({ type: ERROR_LOGIN, message: 'Error en el email y/o password'})
            setLoading(false)
          });
    }

    return (
        <Fragment>
                <LoadingOverlay
                    active={loading}
                    spinner
                    styles={{
                        spinner: (base) => ({
                          ...base,
                          width: '120px',
                          marginTop: '100px',
                          fontWeight: 'bold',
                          '& svg circle': {
                            stroke: 'yellow'
                          }
                        })
                      }}
                    >
              </LoadingOverlay>
            
            <div className="container d-flex justify-content-center" style={{backgroundColor: '#F52F41'}}>
                <div className="form-container mt-5 mb-5 p-3 text-center" style={{backgroundColor: '#fff', width: '400px'}}>
                    <h5 className="m-2 mb-3"> INICIAR SESIÓN </h5>

                    <form onSubmit={login}>
                        <div className="mb-2">
                            <input type="text" placeholder="email" className="p-2"
                                value = { email } name = "email" style={{backgroundColor: '#E5E8ED', border: 'none', width: '90%' }}
                                onChange = { e => onChange(e) } />
                        </div>

                        <div className="">
                            <input type="password" placeholder="password" className="p-2"
                                value = { password } name = "password" style={{backgroundColor: '#E5E8ED', border: 'none', width: '90%' }}
                                onChange = { e => onChange(e) }  />
                        </div>

                        <div>
                            <input type="submit" className="mt-4 p-2 mb-2" value="Entrar" style={{ backgroundColor: '#F52F41', border: 'none', color: '#fff', width: '90%' }}/>
                        </div>

                        {
                            state.error && <span className="text-danger"> { state.message } </span>
                        }
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Login