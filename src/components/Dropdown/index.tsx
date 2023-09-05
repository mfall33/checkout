type DropdownProps = {
    active: boolean,
    option: string,
    items: object[],
    side: "left" | "right"
    onClearPress?: () => void,
    renderItem: (item: any, index: number) => JSX.Element
}

const Dropdown: React.FC<DropdownProps> = ({ active, option, items, side, onClearPress, renderItem }) => {

    return (        
        <div className={`w-48 rounded-t ml-2 bg-lavender dropdown ${side}`}>
            <div className={`dropdown-trigger ${active && 'active'} p-3 font-medium}`}>{option} &#x21e9;</div>
            <div className="dropdown-content">
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
    )

}

export default Dropdown;