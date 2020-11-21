const { BUILDING_TYPES, EMPLOYEE_TYPES, Job } = require('./models')

// buildings is an array of buildings...
// employees is an array of employees

// schedule is an array of Jobs

// const buildingRequirements: {
//   EMPLOYEE_TYPES.cEmployee =
// }

const schedule = (buildings, employees) => {
  const schedule = []

  buildings.forEach(building => {
    if (building.buildingType === BUILDING_TYPES.SSHOME) {
      const index = employees.findIndex(e => e.available && e.employeeType === EMPLOYEE_TYPES.CINSTALLER)
      if (index > -1) {
        const employee = employees[index]
        employee.available = false
        schedule.push(Job({ buildingId: building.id, employeeIds: [employee.id] }))
      }
    }

    if (building.buildingType === BUILDING_TYPES.TSHOME) {
      const jobEmployeeIds = []
      const cInstaller = employees.findIndex(e =>
        e.available &&
        e.employeeType === EMPLOYEE_TYPES.CINSTALLER &&
        !jobEmployeeIds.includes(e.id)
      )

      jobEmployeeIds.push(employees[cInstaller].id)
      const otherInstaller = employees.findIndex(e =>
        e.available &&
        !jobEmployeeIds.includes(e.id) && (
          e.employeeType === EMPLOYEE_TYPES.PINSTALLER ||
          e.employeeType === EMPLOYEE_TYPES.HANDYMAN
        )
      )

      if (cInstaller > -1 && otherInstaller > -1) {
        const cEmployee = employees[cInstaller]
        const otherEmployee = employees[otherInstaller]

        const employeeIds = [employees[cInstaller].id, employees[otherInstaller].id]

        cEmployee.available = false
        otherEmployee.available = false

        schedule.push(Job({ buildingId: building.id, employeeIds }))
      }
    }

    if (building.buildingType === BUILDING_TYPES.COMMERCIAL) {
      const jobEmployeeIds = []
      const cEmployees = employees.filter(e =>
        e.available &&
        e.employeeType === EMPLOYEE_TYPES.CINSTALLER
      )

      if (cEmployees.length >= 2) {
        cEmployees.slice(0, 2).forEach(e => {
          jobEmployeeIds.push(e.id)
        })
      }

      const pEmployees = employees.filter(e =>
        e.available &&
        e.employeeType === EMPLOYEE_TYPES.PINSTALLER &&
        !jobEmployeeIds.includes(e.id)

      )

      if (pEmployees.length >= 2) {
        pEmployees.slice(0, 2).forEach(e => {
          jobEmployeeIds.push(e.id)
        })
      }

      const otherEmployees = employees.filter(e =>
        e.available &&
        !jobEmployeeIds.includes(e.id)
      )

      if (otherEmployees.length >= 4) {
        otherEmployees.slice(0, 4).forEach(e => {
          jobEmployeeIds.push(e.id)
        })
      }

      if (cEmployees.length >= 2 && pEmployees.length >= 2 && otherEmployees.length >= 4) {
        // take resources out of running if enough people available
        employees.forEach(employee => {
          if (jobEmployeeIds.includes(employee.id)) {
            employee.available = false
          }
        })

        schedule.push(Job({ buildingId: building.id, employeeIds: jobEmployeeIds }))
      }
    }
  })

  return schedule
}

module.exports = {
  schedule
}
