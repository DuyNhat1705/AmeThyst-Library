

export default function NumberFill({value, onChange}){

    return (
        <input
          className="numCell"
          type="number"
          value={value}
          onChange = {(e) => onChange(e.target.value)}
          placeholder=""
        />
    );
}