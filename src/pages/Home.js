import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = (props) => {
    const {loggedIn, email} = props
    const navigate = useNavigate()

    const onButtonClick = () => {
        navigate('/login')

    }

    return (
        <div className='mainContainer'>
            <div className={'titleContainer'}>
                <div>Arbeitszeit Management</div>
            </div>
            <div>Neuer Mitarbeiter? Dann erst bitte registrieren!</div>
            <div className={'buttonContainer'}>
                <input
                    className={'inputButton'}
                    type='button'
                    onClick={onButtonClick}
                    value={loggedIn ? 'Log out' : 'Log in'}/>
                    {loggedIn ? <div>Your Email address: {email}</div> : <div/> }
            </div>
        </div>
    )
}

export default Home