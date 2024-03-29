import axios from 'axios';
import React, { useState } from 'react';
import TimePicker from 'react-time-picker';
import './OvrContainer.css';



function OvrContainer() {
    const [students,setStudents] = useState([])
    const [value, onChange] = useState('10:00');
    const [isVisible, setIsVisible] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem("isLoggedin"))[0]['name'];

    const fetchStudent = async (id) => {
        setStudents([]);
        try {
            const response = await axios.get(`http://localhost:8800/override/${id}`);
            if (response.data.length > 0){
                console.log(response.data)
                setStudents(response.data)
            }
        } catch (err) {
            console.log(err);
        }
    };

    function handleSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        fetchStudent(formJson['input-field']);
        setIsVisible(true);
    }
    
    return (
        <div className='ovr-container'>
            <div className='ovr-content'>
            <div className='title-container'><p>Override Page</p></div>
            <div className='search-content-container'> 
                <p>Excuse a student</p>
                <div className='search-content'>
                    <form className='search-field' onSubmit={handleSubmit}>
                            <input 
                                name='input-field'
                                type="text" 
                                class="form-control"
                                placeholder='Enter student ID'
                                required
                            />
                        <button type='submit'>Search</button>
                    </form>
                </div>
            </div>
            {/* {(students.length > 0) && isVisible &&          
                <div className='search-result'>
                    <h2 style={{color: '#00573F',  fontFamily: "Cambria", fontWeight: 900}}><b>STUDENT INFORMATION</b></h2>
                    <div className='student-details'>
                        <div className='name-id-block'>
                            <div className="name">Name: {students[0].first_name + " " + students[0].last_name}</div>
                            <div className="id">ID no.: {students[0].id}</div>
                        </div>
                        <div className='addtl-info-block'>
                            <div className="gradeLevel">Grade Level: {students[0].grade_level}</div>
                            <div className="section">Section: {students[0].section_name}</div>
                            <div className="class-time-in">Class Start: {students[0].start_time}</div>
                            <div className="class-time-out">Class End: {students[0].end_time}</div>
                        </div>
                        <div className='input-fields-block'>
                            <label>Reason</label>
                            <input className='reason-input'/>
                            <label>Overriding Admin</label>
                            <input 
                                className='reason-input ovrAdmin-input'
                                value = {currentUser}
                            />
                            
                        </div>
                        <button style={{height: 40, }}>Override</button>
                    </div>
                </div>
            }
            {(students.length <= 0) && isVisible &&
                <div className='search-result'>
                    <h2>Student does not exist</h2>
                </div>
            }   */}
            </div>
      </div>
    )
}

export default OvrContainer;