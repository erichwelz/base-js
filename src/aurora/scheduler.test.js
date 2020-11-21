const { schedule } = require('./scheduler')
const { BUILDING_TYPES, EMPLOYEE_TYPES, Employee, Building, Job } = require('./models')

const singleHomeFactory = (ids = [123]) => ids.map(id =>
  Building({ id, buildingType: BUILDING_TYPES.SSHOME })
)

const cEmployee1 = () => Employee({ id: 101, employeeType: EMPLOYEE_TYPES.CINSTALLER, available: true })
const cEmployee2 = () => Employee({ id: 102, employeeType: EMPLOYEE_TYPES.CINSTALLER, available: true })

const cInstallerFactory = (ids = [101]) => ids.map(id =>
  Employee({ id, employeeType: EMPLOYEE_TYPES.CINSTALLER, available: true })
)

const ssHomeSchedule = Job({ buildingId: 123, employeeIds: [101] })
const ssHomeSchedule2 = Job({ buildingId: 124, employeeIds: [102] })

describe('schedule Single Story Home - single day', () => {
  it('can schedule single employee for a single day', () => {
    expect(schedule(singleHomeFactory(), cInstallerFactory()))
      .toEqual([ssHomeSchedule])
  })

  it('will not schedule same employee twice', () => {
    expect(schedule(singleHomeFactory([123, 124]), cInstallerFactory()))
      .toEqual([ssHomeSchedule])
  })

  it('will build two homes given adequate employees', () => {
    expect(schedule(singleHomeFactory([123, 124]), cInstallerFactory([101, 102])))
      .toEqual([ssHomeSchedule, ssHomeSchedule2])
  })
})

const doubleHome = Building({ id: 223, buildingType: BUILDING_TYPES.TSHOME })
const doubleHome2 = Building({ id: 224, buildingType: BUILDING_TYPES.TSHOME })
const pEmployee1 = () => Employee({ id: 201, employeeType: EMPLOYEE_TYPES.PINSTALLER, available: true })
const hEmployee1 = () => Employee({ id: 301, employeeType: EMPLOYEE_TYPES.HANDYMAN, available: true })

describe('schedule two story Home - single day', () => {
  it('can schedule a two story home with certified installer & pending certified installer', () => {
    const tsHomeSchedule = Job({ buildingId: 223, employeeIds: [101, 201] })
    expect(schedule([doubleHome], [cEmployee1(), pEmployee1()]))
      .toEqual([tsHomeSchedule])
  })

  it('can schedule a two story home with certified installer & one handyman', () => {
    const tsHomeSchedule = Job({ buildingId: 223, employeeIds: [101, 301] })
    expect(schedule([doubleHome], [cEmployee1(), hEmployee1()]))
      .toEqual([tsHomeSchedule])
  })

  it('can schedule 2 two story homes given adequate resources', () => {
    const tsHomeSchedule = [
      Job({ buildingId: 223, employeeIds: [101, 201] }),
      Job({ buildingId: 224, employeeIds: [102, 301] })
    ]
    expect(schedule([doubleHome, doubleHome2], [cEmployee1(), cEmployee2(), pEmployee1(), hEmployee1()]))
      .toEqual(tsHomeSchedule)
  })
})

const commercial = Building({ id: 323, buildingType: BUILDING_TYPES.COMMERCIAL })
// const commercial2 = Building({ id: 324, buildingType: BUILDING_TYPES.COMMERCIAL })

const pEmployee2 = () => Employee({ id: 202, employeeType: EMPLOYEE_TYPES.PINSTALLER, available: true })

const handyManFactory = (ids = [301]) => ids.map(id =>
  Employee({ id, employeeType: EMPLOYEE_TYPES.HANDYMAN, available: true })
)

describe('schedule commercial property', () => {
  it('can schedule a commercial home with correct resourcing', () => {
    const commercialSchedule = Job({ buildingId: 323, employeeIds: [101, 102, 201, 202, 301, 302, 303, 304] })
    expect(schedule([commercial], [...handyManFactory([301, 302, 303, 304]), pEmployee1(), pEmployee2(), ...cInstallerFactory([101, 102])]))
      .toEqual([commercialSchedule])
  })

  it('can not schedule two commercial homes with inadequate resourcing', () => {
    const commercialSchedule = Job({ buildingId: 323, employeeIds: [101, 102, 201, 202, 301, 302, 303, 304] })
    expect(schedule([commercial, commercial], [...handyManFactory([301, 302, 303, 304]), pEmployee1(), pEmployee2(), ...cInstallerFactory([101, 102])]))
      .toEqual([commercialSchedule])
  })
})
