import { getCurrentDepartment } from "./employeeUtil";

// Function to filter employees by search value
export const filterBySearch = (employees, searchValue) => {
    if(!employees) return [];
    if(searchValue=='') return employees;
    return employees?.filter(employee => 
        employee.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchValue.toLowerCase())
    );
}

// Function to filter employees by country
export const filterByCountry = (employees, countries) => {
    if(!employees) return [];
    if(countries.length==0) return employees;
    console.log(countries)
    return employees?.filter(employee => 
        countries.includes(employee.country.name)
    );
}

// Function to filter employees by manager
export const filterByManagers = (employees, managers) => {
    if(!employees) return [];

    if(managers.length==0) return employees;
    return employees?.filter(employee => 
        managers.includes(employee.managerId)
    );
}

// Function to filter employees by birthday
export const filterByBirthday = (employees, enabled) => {
    if(!employees) return [];

    if(!enabled) return employees;
    const today = new Date();
    return employees?.filter(employee => {
        const birthday = new Date(employee.dateOfBirth);
        return birthday.getDate() === today.getDate() && 
               birthday.getMonth() === today.getMonth() && 
               birthday.getFullYear() === today.getFullYear();
    });
}

// Function to filter employees by designation
export const filterByDesignations = (employees, designations, allDepartments) => {
    if(!employees) return [];

    if(designations.length==0) return employees;
    return employees?.filter(employee => 
        designations.includes(getCurrentDepartment(employee, allDepartments)?.departmentName)
    );
}

const filterEmployees = (employees, searchValue, countries, managers, birthday, designations, allDepartments) => {
    console.log(managers)
    return filterByDesignations(filterByBirthday(filterByManagers(filterByCountry(filterBySearch(employees, searchValue),countries),managers), birthday),designations, allDepartments);
}

export const hasBirthday = (employee) =>
{
    const today = new Date();

    const birthday = new Date(employee.dateOfBirth);
        return birthday.getDate() === today.getDate() && 
               birthday.getMonth() === today.getMonth() && 
               birthday.getFullYear() === today.getFullYear();
}

export default filterEmployees;