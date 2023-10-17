const FormRow=({type,name,value,handelChange,labelText})=> {
    return(
        <div className='form-row'>
            <label htmlFor='name' className='form-label'>
                {labelText||name}
            </label>
            <input type={type} value={value} name={name}
                   onChange={handelChange}
                   className={'form-input'}/>
        </div>

    )
}
export default FormRow