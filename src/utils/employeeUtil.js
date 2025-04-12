
export const getEmployeeById = (employees, empId) => {

    return employees?.find((employee)=>employee?.employeeId==empId)
}

export const getCurrentDepartment = (employee, departments) => {
    const dptObject = employee?.employeeDepartmentHistory.find((dpt)=>dpt?.activeTill==null);
    const currentDpt = departments?.find((dpt)=>dpt?.departmentId==dptObject?.departmentId);
    return currentDpt;
}

export const getManager = (employees, manId) => {
    const manager = employees?.find((emp)=>emp.employeeId==manId);
    return manager;
}

export const getAllManagers = (employees) => {
    const managerIds = employees?.map(employee => employee?.managerId);
    const validManagerIds = managerIds?.filter(id => id !== null && id !== undefined);

    const managers = employees?.filter((emp)=>validManagerIds?.includes(emp?.employeeId));
    return managers;
}

export const getDepartmentById = (departments, deptId) => {
    return departments?.find(dept=>dept?.departmentId==deptId);
}

export const getReporters = (employees, manId) => {
    return employees?.filter(emp=>emp?.managerId==manId);
}