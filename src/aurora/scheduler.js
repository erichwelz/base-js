const { BUILDING_TYPES, EMPLOYEE_TYPES, Job } = require('./models')

// buildings is an array of buildings...
// employees is an array of employees

// schedule is an array of Jobs

// const buildingRequirements: {
//   EMPLOYEE_TYPES.cEmployee =
// }
const SSHOME = [
  { employeeType: EMPLOYEE_TYPES.CINSTALLER, number: 1 }
]

const TSHOME = [
  { employeeType: EMPLOYEE_TYPES.CINSTALLER, number: 1 },
  { employeeType: [EMPLOYEE_TYPES.PINSTALLER, EMPLOYEE_TYPES.HANDYMAN], number: 1 }
]
const ALL_EMPLOYEE_TYPES = Object.values(EMPLOYEE_TYPES)

const COMMERCIAL = [
  { employeeType: EMPLOYEE_TYPES.CINSTALLER, number: 2 },
  { employeeType: EMPLOYEE_TYPES.PINSTALLER, number: 2 },
  { employeeType: ALL_EMPLOYEE_TYPES, number: 4 }
]

const schedule = (buildings, employees) => {
  const schedule = []

  buildings.forEach(building => {
    const availableEmployees = employees.filter(e => e.available === true)

    if (building.buildingType === BUILDING_TYPES.SSHOME) {
      const jobEmployeeIds = []

      SSHOME.forEach(({ employeeType, number }) => {
        const employeeTypeIds = availableEmployees
          .filter(e => employeeType.includes(e.employeeType) &&
          !jobEmployeeIds.includes(e.id))
          .map(x => { return x.id })
          .slice(0, number)

        jobEmployeeIds.push(...employeeTypeIds)
      })

      const numberOfEmployeesRequired = SSHOME
        .map(x => { return x.number })
        .reduce((total, amount) => total + amount)

      if (jobEmployeeIds.length === numberOfEmployeesRequired) {
        // marks resources unvailable if enough people available
        availableEmployees.forEach(e => {
          if (jobEmployeeIds.includes(e.id)) {
            e.available = false
          }
        })
        schedule.push(Job({ buildingId: building.id, employeeIds: jobEmployeeIds }))
      }
    }

    if (building.buildingType === BUILDING_TYPES.TSHOME) {
      const jobEmployeeIds = []

      TSHOME.forEach(({ employeeType, number }) => {
        const employeeTypeIds = availableEmployees
          .filter(e => employeeType.includes(e.employeeType) &&
          !jobEmployeeIds.includes(e.id))
          .map(x => { return x.id })
          .slice(0, number)

        jobEmployeeIds.push(...employeeTypeIds)
      })

      const numberOfEmployeesRequired = TSHOME
        .map(x => { return x.number })
        .reduce((total, amount) => total + amount)

      if (jobEmployeeIds.length === numberOfEmployeesRequired) {
        // marks resources unvailable if enough people available
        availableEmployees.forEach(e => {
          if (jobEmployeeIds.includes(e.id)) {
            e.available = false
          }
        })
        schedule.push(Job({ buildingId: building.id, employeeIds: jobEmployeeIds }))
      }
    }

    if (building.buildingType === BUILDING_TYPES.COMMERCIAL) {
      const jobEmployeeIds = []

      COMMERCIAL.forEach(({ employeeType, number }) => {
        const employeeTypeIds = availableEmployees
          .filter(e => employeeType.includes(e.employeeType) &&
          !jobEmployeeIds.includes(e.id))
          .map(x => { return x.id })
          .slice(0, number)

        jobEmployeeIds.push(...employeeTypeIds)
      })

      const numberOfEmployeesRequired = COMMERCIAL
        .map(x => { return x.number })
        .reduce((total, amount) => total + amount)

      if (jobEmployeeIds.length === numberOfEmployeesRequired) {
        // marks resources unvailable if enough people available
        availableEmployees.forEach(e => {
          if (jobEmployeeIds.includes(e.id)) {
            e.available = false
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
