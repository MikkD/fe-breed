import React, { useState } from 'react';
// RADIO
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Grid, Box, Typography } from '@mui/material';
// TABLE
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { salaryData, defineUniqueValues, defineRoles, defineCompanies } from '../utils';

// UTILS
//1_Salary Finder
const findSalary = (salaryData, selectedRole, selectedCompany) => {
    if (salaryData?.length && selectedRole && selectedCompany) {
        return salaryData.find(
            (data) => data.role === selectedRole && data.company === selectedCompany
        ).salary;
    }
};

//2_Industry Average Salary Finder
const getIndustryAverageSalary = (salaryData, selectedRole) => {
    if (!(salaryData.length && selectedRole)) return;
    const companies = salaryData.filter((data) => data.role === selectedRole);
    const averageSalaryPerIndustry =
        companies.reduce((acc, { salary }) => acc + salary, 0) / companies.length;
    return averageSalaryPerIndustry;
};

//3_Average Salary in Company
const getAverageCompanySalary = (salaryData, selectedCompany) => {
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
const getAverageTechSalary = (salaryData) =>
    salaryData.length &&
    salaryData.reduce((acc, { salary }) => acc + salary, 0) / salaryData.length;

// Converter
const convertSalary = (salary) => {
    if (!salary) return;
    return salary.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    });
};

// COMPONENTS
const Details = ({ salaryData, selectedRole, selectedCompany }) => {
    //1
    const salary = convertSalary(findSalary(salaryData, selectedRole, selectedCompany));

    //2
    const industryAverageSalary = convertSalary(
        getIndustryAverageSalary(salaryData, selectedRole)
    );

    //3
    const averageCompanySalary = convertSalary(
        getAverageCompanySalary(salaryData, selectedCompany)
    );

    //4
    const averageTechSalary = convertSalary(getAverageTechSalary(salaryData));

    return (
        <Box>
            <Typography variant='body1' gutterBottom>
                The salary for {selectedRole} at {''}
                {selectedCompany} is {salary}
            </Typography>
            <Typography variant='body1' gutterBottom>
                The idustry average salary for {selectedRole} is {industryAverageSalary}
            </Typography>
            <Typography variant='body1' gutterBottom>
                The average salary at {selectedCompany} is : {averageCompanySalary}
            </Typography>
            <Typography variant='body1' gutterBottom>
                The average salary in the Tech industry is {averageTechSalary}
            </Typography>
        </Box>
    );
};

const RadioButtons = ({ data, selectedValue, handleRadioChange, title }) => {
    return (
        <FormControl>
            <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                name={`${title}`}
                value={selectedValue}
                onChange={handleRadioChange}>
                {data.map((radioItem) => (
                    <FormControlLabel
                        key={radioItem}
                        value={radioItem}
                        control={<Radio />}
                        label={radioItem}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default function InterviewOne() {
    const roles = defineUniqueValues(salaryData, 'role');
    const companies = defineUniqueValues(salaryData, 'company');

    const [selectedRole, setSelectedRole] = useState(roles[0]);
    const [selectedCompany, setSelectedCompany] = useState(companies[0]);

    const handleRadioChange = (e) => {
        const selectedTitle = e.target.name;
        const selectedValue = e.target.value;

        if (selectedTitle === 'role') {
            setSelectedRole(selectedValue);
            return;
        }
        if (selectedTitle === 'company') {
            setSelectedCompany(selectedValue);
            return;
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell align='left'>Select a role</TableCell>
                        <TableCell align='left'>Select a company </TableCell>
                        <TableCell align='left'>Details </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align='left'>
                            <RadioButtons
                                title='role'
                                data={roles}
                                handleRadioChange={handleRadioChange}
                                selectedValue={selectedRole}
                            />
                        </TableCell>
                        <TableCell align='left'>
                            <RadioButtons
                                title='company'
                                data={companies}
                                handleRadioChange={handleRadioChange}
                                selectedValue={selectedCompany}
                            />
                        </TableCell>
                        <TableCell align='left'>
                            <Details
                                salaryData={salaryData}
                                selectedRole={selectedRole}
                                selectedCompany={selectedCompany}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
