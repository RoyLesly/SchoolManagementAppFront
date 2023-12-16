import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { JSXElementConstructor, ReactElement } from "react";

interface FormInputProps {
    name: string
    label: string
    control: any
    size?: any
    type?: string
    required?: boolean
    defaultValue?: any
    disabled?: boolean
    customInput?: any
    multiline?: boolean
    rows?: number
  }

const MyFormInputText = ({ name, control, label, size, required, type, defaultValue, multiline, rows, disabled, customInput }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <div>
          {customInput ? 
          <div>{customInput}</div>
          : 
          <TextField
            helperText={error ? error.message : null}
            size={size}
            error={!!error}
            required={required}
            onChange={onChange}
            type={type}
            value={value}
            fullWidth
            label={label}
            defaultValue={defaultValue}
            variant="outlined"
            disabled={disabled}
            multiline={multiline}
            maxRows={rows}
            sx={{ width: "100%" }}
          />          
        }
        </div>
      )}
    />
  );
}

export default MyFormInputText;