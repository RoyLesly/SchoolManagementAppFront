import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface FormInputProps {
    name: string
    label: string
    control: any
    size?: any
    type?: string
    required?: boolean
    defaultValue?: any
    options: any
  }

const MyFormInputSelect = ({ name, control, label, size, required, type, defaultValue, options }: FormInputProps) => {
  console.log(name, label, type, defaultValue)
  return (
    <FormControl fullWidth>
      <InputLabel>{defaultValue}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <Select labelId="">
            {options.map((item: any) => (
              <MenuItem key={item.id} value='Female'>Female</MenuItem>
            ))}
            
          </Select>
        )}
      />
      {/* <Select label={label} defaultValue={defaultValue}>
        <MenuItem value='Male'>{defaultValue}</MenuItem>
        <MenuItem value='Female'>Female</MenuItem>
      </Select> */}
    </FormControl>
  );
}

export default MyFormInputSelect;