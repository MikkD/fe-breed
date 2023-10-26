import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import { ISalaryDataItem } from '../types';

interface IRadioButtonsProps {
    data: string[];
    selectedValue: string;
    handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    title: string;
}

const RadioButtons: React.FC<IRadioButtonsProps> = ({
    data,
    selectedValue,
    handleRadioChange,
    title,
}) => {
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

export default RadioButtons;
