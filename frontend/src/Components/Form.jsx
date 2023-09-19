
function Form() {
    const submitForm = (e)=>{
        
    }
  return (
    <form action="" method="post" onSubmit={submitForm}>
        <label htmlFor="student_name"></label>
        <input type="name" id="student_name"/>
        <label htmlFor="student_dept"></label>
        <input type="name" id="student_dept"/>
        <label htmlFor="student_roll"></label>
        <input type="name" id="student_roll"/>
        <label htmlFor="student_year"></label>
        <input type="name" id="student_year"/>
        <label htmlFor="student_div"></label>
        <input type="name" id="student_div"/>
        <label htmlFor="event_name"></label>
        <input type="name" id="event_name"/>
        <button type="submit"></button>
    </form>
  )
}

export default Form