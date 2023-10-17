import {useState, useEffect} from "react";
import {Logo, FormRow} from '../components'
import Wrapper from "../assets/wrappers/RegisterPage";

const initialState = {
    name: '', email: '', password: '', isMember: true,
}
const Register = () => {
    const [values, setValues] = useState(initialState)

    const handelChange = (e) => {
        console.log(e.target)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(e.target)
    }

    return (<Wrapper className='full-page'>
        <form className='form' onSubmit={onSubmit}>
            <Logo/>
            <h3>login</h3>
            {/* name */}
            <FormRow type='text' name='name' value={values.name} handelChange={handelChange}/>
            {/* email */}
            <FormRow type='email' name='email' value={values.email} handelChange={handelChange}/>
            {/* password */}
            <FormRow type='password' name='password' value={values.password} handelChange={handelChange}/>

            <button type={"submit"} className={'btn btn-block'}>
                Submit
            </button>
        </form>

    </Wrapper>)
}
export default Register