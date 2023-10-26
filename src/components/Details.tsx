import { Typography, Box } from '@mui/material';

interface IDetailsProps {
    salary: number;
    industryAverageSalary: number;
    averageCompanySalary: number;
    averageTechSalary: number;
    selectedRole: string;
    selectedCompany: string;
}

const Details: React.FC<IDetailsProps> = ({
    salary,
    industryAverageSalary,
    averageCompanySalary,
    averageTechSalary,
    selectedRole,
    selectedCompany,
}) => {
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

export default Details;
