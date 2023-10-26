export const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];
export const BASE_URL = 'http://pets-v2.dev-apis.com';
export const BASE_OMDB_URL = 'https://omdbapi.com/';
export const MOVIES_PER_PAGE = 10;

// const URL = `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`;
// const BREEDS_URL = `http://pets-v2.dev-apis.com/breeds?animal=${animal}`;

export const salaryData = [
    { role: 'CTO', company: 'Big Data Inc.', salary: 320000 },
    { role: 'Technical Lead', company: 'Big Data Inc.', salary: 230000 },
    { role: 'Software Engineer II', company: 'Big Data Inc.', salary: 180000 },
    { role: 'Software Engineer I', company: 'Big Data Inc.', salary: 140000 },
    { role: 'CTO', company: 'Medium Data Inc.', salary: 215000 },
    { role: 'Technical Lead', company: 'Medium Data Inc.', salary: 165000 },
    { role: 'Software Engineer II', company: 'Medium Data Inc.', salary: 140000 },
    { role: 'Software Engineer I', company: 'Medium Data Inc.', salary: 115000 },
    { role: 'CTO', company: 'Small Data Inc.', salary: 175000 },
    { role: 'Technical Lead', company: 'Small Data Inc.', salary: 135000 },
    { role: 'Software Engineer II', company: 'Small Data Inc.', salary: 115000 },
    { role: 'Software Engineer I', company: 'Small Data Inc.', salary: 95000 },
];

export const getSalaryData = () => {
    setTimeout(() => new Promise((resolve) => resolve(salaryData)), 500);
};

//! Refactored
// export const defineRoles = (salaryData) =>
//     salaryData.length &&
//     salaryData
//         .map((data) => data.role)
//         .filter((role, idx, arr) => arr.indexOf(role) === idx);

// export const defineCompanies = (salaryData) =>
//     salaryData.length &&
//     salaryData
//         .map((data) => data.company)
//         .filter((company, idx, arr) => arr.indexOf(company) === idx);

// const roles = defineRoles(salaryData);
// const companies = defineCompanies(salaryData);

export const defineUniqueValues = (salaryData, type) => {
    if (!salaryData?.length) return;
    return salaryData
        .map((data) => data[type])
        .filter((company, idx, arr) => arr.indexOf(company) === idx);
};

//1_Salary Finder
export const findSalary = (salaryData, selectedRole, selectedCompany) => {
    if (salaryData?.length && selectedRole && selectedCompany) {
        return salaryData.find(
            (data) => data.role === selectedRole && data.company === selectedCompany
        ).salary;
    }
};

//2_Industry Average Salary Finder
export const getIndustryAverageSalary = (salaryData, selectedRole) => {
    if (!(salaryData.length && selectedRole)) return;
    const companies = salaryData.filter((data) => data.role === selectedRole);
    const averageSalaryPerIndustry =
        companies.reduce((acc, { salary }) => acc + salary, 0) / companies.length;
    return averageSalaryPerIndustry;
};

//3_Average Salary in Company
export const getAverageCompanySalary = (salaryData, selectedCompany) => {
    if (!(salaryData.length && selectedCompany)) return;
    const selectedCompanyData = salaryData.filter(
        (data) => data.company === selectedCompany
    );
    const averageSelectedCompanyData =
        selectedCompanyData.reduce((acc, { salary }) => acc + salary, 0) /
        selectedCompanyData.length;
    return averageSelectedCompanyData;
};

//4_Average Tech Salary
export const getAverageTechSalary = (salaryData) =>
    salaryData.length &&
    salaryData.reduce((acc, { salary }) => acc + salary, 0) / salaryData.length;

// Converter
export const convertSalary = (salary) => {
    if (!salary) return;
    return salary.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    });
};
