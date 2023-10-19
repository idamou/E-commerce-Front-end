import {useState, useEffect} from "react";
import {Logo, FormRow, Alert} from '../components'
import Wrapper from "../assets/wrappers/RegisterPage";
import {useAppContext} from "../context/appContext";

const initialState = {
    name: '', email: '', password: '', isMember: true
}
const Register = () => {
    const [values, setValues] = useState(initialState)
    const {isLoading,showAlert,displayAlert} = useAppContext()

    const toogelMember = () => {
        setValues({...values, isMember: !values.isMember})
    }
    const handelChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }
    const onSubmit = (e) => {
        e.preventDefault()
       const {name,email,password,isMember}=values
        if(!email||!password||(!isMember && !name)){
            displayAlert()
            return
        }
        console.log(values)
    }

    return (<Wrapper className='full-page'>
        <form className='form' onSubmit={onSubmit}>
            <Logo/>
            <h3>{values.isMember ? "login" : "register"}</h3>
            {showAlert && <Alert/>}
            {/* name */}
            {!values.isMember && (<FormRow type='text' name='name' value={values.name} handelChange={handelChange}/>
            )}
            {/* email */}
            <FormRow type='email' name='email' value={values.email} handelChange={handelChange}/>
            {/* password */}
            <FormRow type='password' name='password' value={values.password} handelChange={handelChange}/>

            <button type={"submit"} className={'btn btn-block'}>
                Submit
            </button>
            <p>
                {values.isMember ? 'not a member yet?' : 'Already a member?'}
                <button type='button' onClick={toogelMember} className='member-btn'>
                    {values.isMember ? 'Register' : 'Login'}
                </button>
            </p>
        </form>

    </Wrapper>)
}
export default Register