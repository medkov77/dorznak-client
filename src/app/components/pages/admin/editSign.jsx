import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn } from "../../../../store/users";
import { Paper } from "@mui/material";
import { Box, Typography } from "@mui/material";
import TextInput from "../../common/table/textInput";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate, useParams } from "react-router-dom";
import { getSignsList, updeteSign, addSign } from "../../../../store/signs";
import SelectUnstyled from "@mui/base/SelectUnstyled";
import OptionUnstyled from "@mui/base/OptionUnstyled";

import SelectedField from "../../common/table/selectedUFeld";
const EditSign = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let signsList = useSelector(getSignsList());
  const { id } = useParams();
  const sign = id
    ? signsList.find((item) => item._id === id)
    : {
        gost: "",
        name: "",
        form: "",
        description: "",
        imgSrc: "",
      };

  const [data, setData] = useState({
    gost: sign.gost,
    name: sign.name,
    type: sign.type,
    form: sign.form,
    description: sign.description,
    imgSrc: sign.imgSrc,
  });

  const isLoggedIn = useSelector(getIsLoggedIn());

  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const handleBack = () => {
    navigate(-1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updeteSign(id, data)).then(() => {
        navigate(-1);
      });
    } else {
      dispatch(addSign(data)).then(() => {
        navigate(-1);
      });
    }
  };
  if (!isLoggedIn)
    return (
      <Typography variant="h6" mt={2}>
        Эта страница только для зарегистрированных пользователей
      </Typography>
    );
  return (
    <Paper elevation={3} sx={{ padding: "1rem", mt: "5.2rem", px: 3 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <TextInput
            name="gost"
            type="text"
            value={data.gost}
            help="Номер знака по ГОСТ"
            onChange={handleChange}
            required={true}
            label="Номер знака по ГОСТ"
          />
          <TextInput
            name="name"
            type="text"
            value={data.name}
            help="Наименоване"
            onChange={handleChange}
            required={true}
            label="Наименование знака по ГОСТ"
          />
          <textarea
            className="edit-area"
            rows="5"
            name="description"
            defaultValue={data.description}
            onChange={handleChange}
          ></textarea>
          <SelectUnstyled>
            <OptionUnstyled>Треугольник</OptionUnstyled>
            <OptionUnstyled>{/* option two */}</OptionUnstyled>
          </SelectUnstyled>
          <TextInput
            name="imgSrc"
            type="text"
            value={data.imgSrc}
            help="Путь к изображению"
            onChange={handleChange}
          />
          <Stack spacing={2} direction="row" justifyContent="flex-start" my={3}>
            <SelectedField
              items={[
                { name: "Треугольник", value: "triangle" },
                { name: "Круг", value: "round" },
                { name: "Квадрат", value: "square" },
              ]}
              label="Форма знака"
              onSelect={handleChange}
              name="form"
              value={data.form}
            />
          </Stack>

          <Stack spacing={2} direction="row" justifyContent="flex-end" m={3}>
            {id ? (
              <Button variant="contained" type="submit">
                Изменить
              </Button>
            ) : (
              <Button variant="contained" type="submit">
                Добавить
              </Button>
            )}
            <Button variant="outlined" onClick={handleBack}>
              Отмена
            </Button>
          </Stack>
        </Box>
      </form>
    </Paper>
  );
};

export default EditSign;
