import React, { useEffect, useState } from 'react'
import Employee from './components/Employee/Employee'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import "./App.css"

const App = () => {

  const [employees, setEmployees] = useState(JSON.stringify(localStorage.getItem('employeeList')) || [
    {
        id: 1,
        fullName: "Bob Jones",
        designation: "JavaScript Developer",
        gender: "male",
        teamName: "TeamA"
      },
      {
        id: 2,
        fullName: "Jill Bailey",
        designation: "Node Developer",
        gender: "female",
        teamName: "TeamA"
      },
      {
        id: 3,
        fullName: "Gail Shepherd",
        designation: "Java Developer",
        gender: "female",
        teamName: "TeamA"
      },
      {
        id: 4,
        fullName: "Sam Reynolds",
        designation: "React Developer",
        gender: "male",
        teamName: "TeamB"
      },
      {
        id: 5,
        fullName: "David Henry",
        designation: "DotNet Developer",
        gender: "male",
        teamName: "TeamB"
      },
      {
        id: 6,
        fullName: "Sarah Blake",
        designation: "SQL Server DBA",
        gender: "female",
        teamName: "TeamB"
      },
      {
        id: 7,
        fullName: "James Bennet",
        designation: "Angular Developer",
        gender: "male",
        teamName: "TeamC"
      },
      {
        id: 8,
        fullName: "Jessica Faye",
        designation: "API Developer",
        gender: "female",
        teamName: "TeamC"
      },
      {
        id: 9,
        fullName: "Lita Stone",
        designation: "C++ Developer",
        gender: "female",
        teamName: "TeamC"
      },
      {
        id: 10,
        fullName: "Daniel Young",
        designation: "Python Developer",
        gender: "male",
        teamName: "TeamD"
      },
      {
        id: 11,
        fullName: "Adrian Jacobs",
        designation: "Vue Developer",
        gender: "male",
        teamName: "TeamD"
      },
      {
        id: 12,
        fullName: "Devin Monroe",
        designation: "Graphic Designer",
        gender: "male",
        teamName: "TeamD"
      }
]);

const [selectedTeam, setSelectedTeam] = useState(JSON.parse(localStorage.getItem('selectedTeam')) || ("TeamB"))

const handleTeamSelectionChange=(event)=>{
    console.log(event.target.value)
    setSelectedTeam(event.target.value)
}

const handleEmployeeCardClick=(event)=>{
    const transformedEmployees = employees.map((employ)=> employ.id === parseInt(event.currenttarget.id)
    ? (employ.teamName === selectedTeam) ? {...employ,teamName:''}: {...employ, teamName: selectedTeam}
    : employ
    )

    setEmployees(transformedEmployees)
}

useEffect(()=>{
  localStorage.setItem('employeeList',JSON.stringify(employees))
},[])

useEffect(()=>{
  localStorage.setItem('selectedTeam',JSON.stringify(selectedTeam))
},[selectedTeam])

  return (
    <div>
      <Header 
      selectedTeam={selectedTeam}
      teamMemberCount={employees.filter((employee)=> employee.teamName === selectedTeam).length}
      />
      <Employee 
      employees ={employees} 
      selectedTeam={selectedTeam}
      handleEmployeeCardClick={handleEmployeeCardClick}
      handleTeamSelectionChange={handleTeamSelectionChange}
      />
       {/* <Content  /> */}
      <Footer />
    </div>
  )
}

export default App
