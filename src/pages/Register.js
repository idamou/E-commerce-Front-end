import {useState, useEffect} from "react";
import {Logo, FormRow, Alert} from '../components'
import Wrapper from "../assets/wrappers/RegisterPage";
import {useAppContext} from "../context/appContext";
import {useNavigate} from "react-router-dom";

const initialState = {
    name: '', email: '', password: '', isMember: true
}
const Register = () => {
    const {user} = useAppContext();
    const navigate = useNavigate();
    const [values, setValues] = useState(initialState);
    const {
        isLoading,
        setupUser,
        showAlert,
        displayAlert,
    } = useAppContext();
    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
    }, [user, navigate]);
    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    };
    const toggleMember = () => {
        setValues({...values, isMember: !values.isMember}); // toggle

    }
    const onSubmit = (e) => {
        e.preventDefault();
        const {name, email, password, isMember} = values
        if (!email || !password || (!isMember && !name)) {
            displayAlert()
            return
        }
        const currentUser = {name, email, password};
        if (isMember) {
            setupUser({currentUser, endPoint: 'login', alertText: 'Login Successful ! Redirecting to home page...'})
        } else {
            setupUser({currentUser, endPoint: 'register', alertText: 'User created !'});
        }


    }

    return (<Wrapper className='full-page'>
        <form className='form' onSubmit={onSubmit}>
            <Logo/>
            <h3>{values.isMember ? "login" : "register"}</h3>
            {showAlert && <Alert/>}
            {/* name */}
            {!values.isMember && (<FormRow type='text' name='name' value={values.name} handelChange={handleChange}/>
            )}
            {/* email */}
            <FormRow type='email' name='email' value={values.email} handelChange={handleChange}/>
            {/* password */}
            <FormRow type='password' name='password' value={values.password} handelChange={handleChange}/>

            <button type={"submit"} className={'btn btn-block'}>
                Submit
            </button>
            <p>
                {values.isMember ? 'not a member yet?' : 'Already a member?'}
                <button type='button' onClick={toggleMember} className='member-btn'>
                    {values.isMember ? 'Register' : 'Login'}
                </button>
            </p>
        </form>

    </Wrapper>)
}
export default Register