import { Controller } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface FormInputProps {
  name: string
  label: string
  control: any
  selectItems: any
}

interface SelectItemProps {
  displayName: string
  value: any
}

const MyFormSelect = ({ name, control, label, selectItems }: FormInputProps) => {
  return (
    <FormControl size={"medium"} fullWidth>
       <InputLabel>{label}</InputLabel>
        <Controller
            render={({ field: { onChange, value } }) => (
            <Select onChange={onChange} value={value}>
              {selectItems.map((item: SelectItemProps) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.displayName}
              </MenuItem>
              ))}
            </Select>
            )}
            control={control}
            name={name}
        />
    </FormControl>
  );
}

export default MyFormSelect;