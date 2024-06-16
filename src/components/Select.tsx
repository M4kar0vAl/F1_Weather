import '../styles/Select.css'

interface propSelect {
    options: Array<string>
    defaultValue: string
    value: string
    onChange: Function
}

function Select({ options, defaultValue, value, onChange }: propSelect) {
    

    return (
        <select
            className="Select"
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option disabled value="">{ defaultValue }</option>
            {options.map((option) => 
                <option key={option} value={option}>{option}</option>
            )}
        </select>
    )
}

export default Select
