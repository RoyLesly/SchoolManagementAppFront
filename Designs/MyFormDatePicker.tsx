import { Controller } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
// import { LocalizationProvider, LocalizationProviderProps } from "@mui/x-date-pickers";
import { DatePicker, LocalizationProvider, LocalizationProviderProps } from "@mui/lab";
import  AdapterDateFns from '@mui/lab/AdapterDateFns';

interface FormInputProps {
  name: string
  label: string
  control: any
  selectItems: any
}

interface DatepickerItemProps {
  displayName: string
  value: any
}

const MyFormDatepicker = ({ name, control, label, selectItems }: FormInputProps) => {
  return (
    // <FormControl size={"medium"} fullWidth>
    //    <InputLabel>{label}</InputLabel>
    //     <Controller
    //         render={({ field: { onChange, value } }) => (
    //         <Select onChange={onChange} value={value}>
    //           {selectItems.map((item: DatepickerItemProps) => (
    //             <MenuItem key={item.value} value={item.value}>
    //               {item.displayName}
    //           </MenuItem>
    //           ))}
    //         </Select>
    //         )}
    //         control={control}
    //         name={name}
    //     />
    // </FormControl>
    <DatePicker />
  );
}

export default MyFormDatepicker;