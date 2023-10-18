import { Typography } from '@mui/material';
import { IPet } from './Pet';
import List from '@mui/material/List';

export interface IListItem extends IPet {
    [key: string]: any; // This allows any additional properties
}

export interface IList {
    data: IListItem[];
    itemRenderer: (item: IListItem) => React.ReactElement;
}

export const ReusableList: React.FC<IList> = ({ data, itemRenderer: ItemRenderer }) => {
    return (
        <List>
            {!data?.length ? (
                <Typography variant='h6'>No data found </Typography>
            ) : (
                data.map((item) => <ItemRenderer key={item.id} {...item} />)
            )}
        </List>
    );
};
