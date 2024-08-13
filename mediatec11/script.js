document.addEventListener('DOMContentLoaded', ()=>{
    const studentForm = document.getElementById('studentForm')
    const studentList = document.getElementById('studentList')
    let students = JSON.parse(localStorage.getItem('students')) || []

    function renderStudents(){
        studentList.innerHTML = ''
        students.forEach((student, index)=>{
            const li = document.createElement('li')
            li.innerHTML = `
                ${student.name} - ${student.age} años - Grado: ${student.grade}
                <button onclick = "editStudent(${index})">Editar ✏</button>
                <button onclick = "deleteStudent(${index})">Borrar 🗑</button>
            `
            studentList.appendChild(li)
            
        })
    }

    studentForm.addEventListener('submit', (e)=>{
        e.preventDefault()
        const studentId = document.getElementById('studentId').value
        const name = document.getElementById('name').value
        const age = document.getElementById('age').value
        const grade = document.getElementById('grade').value
        const studentData = {name, age, grade}

        if (studentId) {
            students[studentId]= studentData
        } else {
            students.push(studentData)
        }
        localStorage.setItem('students', JSON.stringify(students))
        renderStudents()
        studentForm.reset()
        document.getElementById('studentId').value=''
    })

    window.editStudent = (index)=>{
        document.getElementById('studentId').value = index
        document.getElementById('name').value = students[index].name
        document.getElementById('age').value = students[index].age
        document.getElementById('grade').value = students[index].grade
    }

    window.deleteStudent = (index)=>{
        students.splice(index, 1)
        localStorage.setItem('students', JSON.stringify(students))
        renderStudents()
    }

    renderStudents()


})