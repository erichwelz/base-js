const BUILDING_TYPES = {
  SSHOME: 'Single Story Home',
  TSHOME: 'Two Story Home',
  COMMERCIAL: 'Commercial Building'
}

const EMPLOYEE_TYPES = {
  CINSTALLER: 'Certified Installer',
  PINSTALLER: 'Installer pending certification',
  HANDYMAN: 'Handyman'
}

// available bool
// id 100 series CINSTALLER
// id 200 series PINSTALLER
// id 300 series HANDYMAN

const Employee = ({
  id,
  employeeType,
  available
}) => ({
  id,
  employeeType,
  available
})

const Building = ({
  id,
  buildingType
  // todo Schedule
}) => ({
  id,
  buildingType
})

// buildingId - int
// employeeId - arr of integers
const Job = ({
  buildingId,
  employeeIds
  // todo Schedule
}) => ({
  buildingId,
  employeeIds
})

// dateId - int
// Jobs - arr of Job
// not implemented
const DaySchedule = ({
  dateId,
  Jobs
  // todo Schedule
}) => ({
  dateId,
  Jobs
})

module.exports = {
  BUILDING_TYPES, EMPLOYEE_TYPES, Employee, Building, Job, DaySchedule
}
