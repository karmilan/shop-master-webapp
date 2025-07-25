import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const RadioButtonsGroup = ({
  rbValue,
  setRbValue,
  rbVal1,
  rbVal2,
  rbLabl1,
  rbLabl2,
}) => {
  //   const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setRbValue(event.target.value);
  };

  return (
    <FormControl sx={{ mt: { xs: 2, sm: 2 } }}>
      <FormLabel sx={{ color: "black" }}>Fully Settled</FormLabel>
      <RadioGroup row value={rbValue} onChange={handleChange}>
        <FormControlLabel
          value={rbVal1}
          control={
            <Radio
              sx={{
                color: "black",
                "&.Mui-checked": {
                  color: "black",
                },
              }}
            />
          }
          label={rbLabl1}
        />
        <FormControlLabel
          value={rbVal2}
          control={
            <Radio
              sx={{
                color: "black",
                "&.Mui-checked": {
                  color: "black",
                },
              }}
            />
          }
          label={rbLabl2}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonsGroup;
