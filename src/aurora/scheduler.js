const { Job } = require('./models')

const gatherEmployees = (buildingType, availableEmployees) => {
  const { resources } = buildingType
  const jobEmployeeIds = []

  resources.forEach(({ employeeType, number }) => {
    const employeeTypeIds = availableEmployees
      .filter(e => employeeType.includes(e.employeeType) &&
          !jobEmployeeIds.includes(e.id))
      .map(x => x.id)
      .slice(0, number)

    jobEmployeeIds.push(...employeeTypeIds)
  })

  const numberOfEmployeesRequired = resources
    .map(x => x.number)
    .reduce((total, amount) => total + amount)

  if (jobEmployeeIds.length === numberOfEmployeesRequired) {
    // marks resources unvailable if enough people available
    availableEmployees.forEach(e => {
      if (jobEmployeeIds.includes(e.id)) {
        e.available = false
      }
    })
    return jobEmployeeIds
  }
  return false
}

// buildings is an array of buildings...
// employees is an array of employees

// schedule is an array of Jobs
const schedule = (buildings, employees) => {
  const schedule = []

  buildings.forEach(building => {
    const availableEmployees = employees.filter(e => e.available === true)

    const jobEmployeeIds = gatherEmployees(building.buildingType, availableEmployees)

    if (jobEmployeeIds) { schedule.push(Job({ buildingId: building.id, employeeIds: jobEmployeeIds })) }
  })

  return schedule
}

module.exports = {
  schedule
}
