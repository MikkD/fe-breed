import React, { useState, useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import {
    salaryData,
    defineUniqueValues,
    findSalary,
    getIndustryAverageSalary,
    getAverageCompanySalary,
    getAverageTechSalary,
    convertSalary,
} from '../utils';
import Details from '../components/Details';
import RadioButtons from '../components/RadioButtons';

export default function InterviewOne() {
    const roles = defineUniqueValues(salaryData, 'role');
    const companies = defineUniqueValues(salaryData, 'company');

    const [selectedRole, setSelectedRole] = useState(roles[0]);
    const [selectedCompany, setSelectedCompany] = useState(companies[0]);

    const handleRadioChange = (e) => {
        const { name, value } = e.target;

        if (name === 'role') {
            return setSelectedRole(value);
        }
        if (name === 'company') {
            return setSelectedCompany(value);
        }
    };

    const salary = convertSalary(findSalary(salaryData, selectedRole, selectedCompany));

    const industryAverageSalary = useMemo(() =>
        convertSalary(getIndustryAverageSalary(salaryData, selectedRole), [
            salaryData,
            selectedRole,
        ])
    );

    const averageCompanySalary = useMemo(() =>
        convertSalary(getAverageCompanySalary(salaryData, selectedCompany), [
            salaryData,
            selectedCompany,
        ])
    );

    const averageTechSalary = useMemo(
        () => convertSalary(getAverageTechSalary(salaryData)),
        [salaryData]
    );

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
                                selectedRole={selectedRole}
                                selectedCompany={selectedCompany}
                                salary={salary}
                                industryAverageSalary={industryAverageSalary}
                                averageCompanySalary={averageCompanySalary}
                                averageTechSalary={averageTechSalary}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
