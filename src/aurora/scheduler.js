const { BUILDING_TYPES, EMPLOYEE_TYPES, Employee, Building, Job } = require('./models')

// buildings is an array of buildings...
// employees is an array of employees

// schedule is an array of Jobs

// const buildingRequirements: {
//   EMPLOYEE_TYPES.cEmployee =
// }

const schedule = (buildings, employees) => {
  const schedule = []
  const scheduledEmployeeIds = []
  buildings.forEach(building => {
    // METHOD with deprecating employee that updated array giving trouble with test fixtures
    // if (building.buildingType === BUILDING_TYPES.SSHOME) {
    //   const index = employees.findIndex(e => !e.employeeId && e.employeeType === EMPLOYEE_TYPES.CINSTALLER)
    //   if (index > -1) {
    //     const employee = employees[index]
    //     employee.available = false
    //     schedule.push(Job({ buildingId: building.id, employeeIds: [employee.id] }))
    //   }
    // }

    if (building.buildingType === BUILDING_TYPES.SSHOME) {
      const index = employees.findIndex(
        e => e.employeeType === EMPLOYEE_TYPES.CINSTALLER &&
        !scheduledEmployeeIds.includes(e.id)
      )
      if (index > -1) {
        const employee = employees[index]
        scheduledEmployeeIds.push(employee.id)
        schedule.push(Job({ buildingId: building.id, employeeIds: [employee.id] }))
      }
    }

    if (building.buildingType === BUILDING_TYPES.TSHOME) {
      const cinstaller = employees.findIndex(e =>
        e.employeeType === EMPLOYEE_TYPES.CINSTALLER &&
        !scheduledEmployeeIds.includes(e.id)
      )
      const otherInstaller = employees.findIndex(e =>
        !scheduledEmployeeIds.includes(e.id) && (
          e.employeeType === EMPLOYEE_TYPES.PINSTALLER ||
          e.employeeType === EMPLOYEE_TYPES.HANDYMAN
        )
      )

      if (cinstaller > -1 && otherInstaller > -1) {
        const cEmployee = employees[cinstaller]
        const otherEmployee = employees[otherInstaller]
        scheduledEmployeeIds.push(cEmployee.id)
        scheduledEmployeeIds.push(otherEmployee.id)

        schedule.push(Job({ buildingId: building.id, employeeIds: [cEmployee.id, otherEmployee.id] }))
      }
    }

    if (building.buildingType === BUILDING_TYPES.COMMERCIAL) {
      const jobEmployeeIds = []
      const cEmployees = employees.filter(e =>
        e.employeeType === EMPLOYEE_TYPES.CINSTALLER &&
        !scheduledEmployeeIds.includes(e.id)
      )

      if (cEmployees.length >= 2) {
        cEmployees.slice(0, 2).forEach(e => {
          jobEmployeeIds.push(e.id)
        })
      }

      const pEmployees = employees.filter(e =>
        e.employeeType === EMPLOYEE_TYPES.PINSTALLER &&
        !scheduledEmployeeIds.includes(e.id) &&
        !jobEmployeeIds.includes(e.id)

      )

      if (pEmployees.length >= 2) {
        pEmployees.slice(0, 2).forEach(e => {
          jobEmployeeIds.push(e.id)
        })
      }

      const otherEmployees = employees.filter(e =>
        !scheduledEmployeeIds.includes(e.id) &&
        !jobEmployeeIds.includes(e.id)
      )

      if (otherEmployees.length >= 4) {
        otherEmployees.slice(0, 4).forEach(e => {
          jobEmployeeIds.push(e.id)
        })
      }

      if (cEmployees.length >= 2 && pEmployees.length >= 2 && otherEmployees.length >= 4) {
        // take resources out of running if enough people available
        scheduledEmployeeIds.push(jobEmployeeIds)
        schedule.push(Job({ buildingId: building.id, employeeIds: jobEmployeeIds }))
      }
    }
  })

  return schedule
}

module.exports = {
  schedule
}
