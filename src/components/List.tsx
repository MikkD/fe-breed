import { IPet } from './Pet';

export interface IListItem extends IPet {
    [key: string]: any; // This allows any additional properties
}

export interface IList {
    data: IListItem[];
    itemRenderer: (item: IListItem) => React.ReactElement;
}

export const List: React.FC<IList> = ({ data, itemRenderer: ItemRenderer }) => {
    return (
        <ul>
            {!data?.length ? (
                <h3>No data found </h3>
            ) : (
                data.map((item) => (
                    <li>
                        <ItemRenderer key={item.id} {...item} />
                    </li>
                ))
            )}
        </ul>
    );
};
