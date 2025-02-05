import { AppDispatch } from "@/store";
import { filterList, getFilters } from "@/store/slices/list-slice";
import useStyles from "@/styles/styles";
import { Box, Stack } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomRadio from "./custom-radio";

export default function Filters() {
  const dispatch = useDispatch<AppDispatch>();
  const classes = useStyles();

  const { filters } = useSelector((state) => state?.list);

  const fetchFilters = useCallback(() => {
    if (filters.length === 0) {
      dispatch(getFilters());
    }
  }, [dispatch, filters.length]);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  return (
    <Box className={classes.filters}>
      {filters.length > 0 &&
        filters.map((filter, index) => (
          <Stack direction="row">
            <CustomRadio
            key={filter.value}
            value={filter.filter}
            onChange={() => dispatch(filterList(filter.id))}
            name={filter.filter}
            checked={filter.checked}
            labelText={filter.title}
            />
          </Stack>
        ))}
    </Box>
  );
}
