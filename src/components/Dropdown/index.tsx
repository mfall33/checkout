type DropdownProps = {
    active: boolean,
    option: string,
    items: object[],
    side: "left" | "right",
    classes?: string[] | string,
    onClearPress?: () => void,
    renderItem: (item: any, index: number) => JSX.Element
}

const Dropdown: React.FC<DropdownProps> = ({ active, option, items, side, classes, onClearPress, renderItem }) => {

    return (
        <div className={`product-filter-dropdown dropdown ${side} ${classes ?? ''}`}>
            <div className={`dropdown-trigger ${active ? 'active' : ''} p-3 font-medium`}>{option} &#x21e9;</div>
            <div className="dropdown-content hide-scrollbar">
                {onClearPress &&
                    <h3 className="font-semibold cursor-pointer text-right mb-3 select-none" onClick={onClearPress}>CLEAR</h3>
                }
                <ul>
                    {items && items.map((item: object, index: number) =>
                        renderItem(item, index)
                    )}
                </ul>
            </div>
        </div>
    );

}

export default Dropdown;