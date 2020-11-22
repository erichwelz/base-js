const EMPLOYEE_TYPES = {
  CINSTALLER: 'Certified Installer',
  PINSTALLER: 'Installer pending certification',
  HANDYMAN: 'Handyman'
}

const ALL_EMPLOYEE_TYPES = Object.values(EMPLOYEE_TYPES)

const BUILDING_TYPES = {
  SSHOME: { name: 'Single Story Home', resources: [{ employeeType: EMPLOYEE_TYPES.CINSTALLER, number: 1 }] },
  TSHOME: {
    name: 'Two Story Home',
    resources: [
      { employeeType: EMPLOYEE_TYPES.CINSTALLER, number: 1 },
      { employeeType: [EMPLOYEE_TYPES.PINSTALLER, EMPLOYEE_TYPES.HANDYMAN], number: 1 }
    ]
  },
  COMMERCIAL: {
    name: 'Commercial Building',
    resources: [
      { employeeType: EMPLOYEE_TYPES.CINSTALLER, number: 2 },
      { employeeType: EMPLOYEE_TYPES.PINSTALLER, number: 2 },
      { employeeType: ALL_EMPLOYEE_TYPES, number: 4 }
    ]
  }
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
