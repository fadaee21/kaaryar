import { TextField } from '@mui/material'


const SearchProvinces = ({setProvincesState}:any) => {
  return (
    <TextField
      id="outlined-provinces"
      label="استان"
      variant="outlined"
      onChange={(e) => setProvincesState(e.target.value)}
      type="text"
    />
  )
}

export default SearchProvinces