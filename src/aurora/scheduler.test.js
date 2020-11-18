const { schedule } = require('./scheduler')
const { BUILDING_TYPES, EMPLOYEE_TYPES, Employee, Building, Job } = require('./models')

const singleHome = Building({ id: 123, buildingType: BUILDING_TYPES.SSHOME })
const singleHome2 = Building({ id: 124, buildingType: BUILDING_TYPES.SSHOME })

const cEmployee1 = Employee({ id: 101, employeeType: EMPLOYEE_TYPES.CINSTALLER, available: true })
const cEmployee2 = Employee({ id: 102, employeeType: EMPLOYEE_TYPES.CINSTALLER, available: true })

const ssHomeSchedule = Job({ buildingId: 123, employeeIds: [101] })
const ssHomeSchedule2 = Job({ buildingId: 124, employeeIds: [102] })

describe('schedule Single Story Home - single day', () => {
  it('can schedule single employee for a single day', () => {
    expect(schedule([singleHome], [cEmployee1]))
      .toEqual([ssHomeSchedule])
  })

  it('will not schedule same employee twice', () => {
    expect(schedule([singleHome, singleHome2], [cEmployee1]))
      .toEqual([ssHomeSchedule])
  })

  it('will build two homes given adequate employees', () => {
    expect(schedule([singleHome, singleHome2], [cEmployee1, cEmployee2]))
      .toEqual([ssHomeSchedule, ssHomeSchedule2])
  })
})

const doubleHome = Building({ id: 223, buildingType: BUILDING_TYPES.TSHOME })
const doubleHome2 = Building({ id: 224, buildingType: BUILDING_TYPES.TSHOME })
const pEmployee1 = Employee({ id: 201, employeeType: EMPLOYEE_TYPES.PINSTALLER, available: true })
const hEmployee1 = Employee({ id: 301, employeeType: EMPLOYEE_TYPES.HANDYMAN, available: true })

describe('schedule two story Home - single day', () => {
  it('can schedule a two story home with certified installer & pending certified installer', () => {
    const tsHomeSchedule = Job({ buildingId: 223, employeeIds: [101, 201] })
    expect(schedule([doubleHome], [cEmployee1, pEmployee1]))
      .toEqual([tsHomeSchedule])
  })

  it('can schedule a two story home with certified installer & one handyman', () => {
    const tsHomeSchedule = Job({ buildingId: 223, employeeIds: [101, 301] })
    expect(schedule([doubleHome], [cEmployee1, hEmployee1]))
      .toEqual([tsHomeSchedule])
  })

  it('can schedule 2 two story homes given adequate resources', () => {
    const tsHomeSchedule = [
      Job({ buildingId: 223, employeeIds: [101, 201] }),
      Job({ buildingId: 224, employeeIds: [102, 301] })
    ]
    expect(schedule([doubleHome, doubleHome2], [cEmployee1, cEmployee2, pEmployee1, hEmployee1]))
      .toEqual(tsHomeSchedule)
  })
})

const commercial = Building({ id: 323, buildingType: BUILDING_TYPES.COMMERCIAL })
// const commercial2 = Building({ id: 324, buildingType: BUILDING_TYPES.COMMERCIAL })

const pEmployee2 = Employee({ id: 202, employeeType: EMPLOYEE_TYPES.PINSTALLER, available: true })
const hEmployee2 = Employee({ id: 302, employeeType: EMPLOYEE_TYPES.HANDYMAN, available: true })
const hEmployee3 = Employee({ id: 303, employeeType: EMPLOYEE_TYPES.HANDYMAN, available: true })
const hEmployee4 = Employee({ id: 304, employeeType: EMPLOYEE_TYPES.HANDYMAN, available: true })

describe('schedule commercial property', () => {
  it('can schedule a commercial home with correct resourcing', () => {
    const commercialSchedule = Job({ buildingId: 323, employeeIds: [101, 102, 201, 202, 301, 302, 303, 304] })
    expect(schedule([commercial], [hEmployee1, hEmployee2, hEmployee3, hEmployee4, pEmployee1, pEmployee2, cEmployee1, cEmployee2]))
      .toEqual([commercialSchedule])
  })
})
