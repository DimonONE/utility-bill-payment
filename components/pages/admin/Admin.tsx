import React, {useState} from 'react';
import {FormControl} from '@mui/material';
import {NextPage} from 'next';
import {API_URL} from '../../config';
import axios from 'axios';
import {
  Typography,
  InputLabel,
  Input,
  FormHelperText,
  Box,
  Button,
} from '@mui/material';

type IProps = {
  providers: any;
};

const Admin: NextPage<IProps> = ({providers}) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    price: 0,
    password: '',
    passwordRepeat: '',
    providers: null,
  });

  console.log('providers', providers);

  const handleForm = async () => {
    const res = await axios.post(`${API_URL}/internet`, {
      ...data,
      userId: 1,
    });

    console.log('res', res);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {id, value} = event.target;
    setData(prev => ({...prev, [id]: value}));
  };

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Typography
        fontSize={20}
        marginBottom={5}
        width={'max-content'}
        textTransform="uppercase"
      >
        Додати споживача
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <FormControl sx={{margin: '10px 0', maxWidth: '300px'}}>
          <InputLabel htmlFor="my-name">Ім'я</InputLabel>
          <Input
            id="name"
            value={data.name}
            onChange={handleChange}
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">
            Введіть ваше ім'я.
          </FormHelperText>
        </FormControl>
        <FormControl sx={{margin: '10px 0'}}>
          <InputLabel htmlFor="my-email">Email адрес</InputLabel>
          <Input
            id="email"
            onChange={handleChange}
            aria-describedby="my-helper-text"
            type="email"
          />
          <FormHelperText id="my-helper-text">
            Введіть ваш email.
          </FormHelperText>
        </FormControl>
        <FormControl sx={{margin: '10px 0', maxWidth: '300px'}}>
          <InputLabel htmlFor="my-password">Пароль</InputLabel>
          <Input
            id="password"
            onChange={handleChange}
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">
            Введіть ваш password.
          </FormHelperText>
        </FormControl>
        <FormControl sx={{margin: '10px 0', maxWidth: '300px'}}>
          <InputLabel htmlFor="my-password">Повторіть пароль</InputLabel>
          <Input
            id="passwordRepeat"
            onChange={handleChange}
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">
            Введіть ваш password повторно.
          </FormHelperText>
        </FormControl>
        <FormControl sx={{margin: '10px 0', maxWidth: '300px'}}>
          <InputLabel htmlFor="my-password2">Послуга</InputLabel>
          <Input
            id="providers"
            onChange={handleChange}
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">Оберіть послугу.</FormHelperText>
        </FormControl>
      </Box>
      <Button
        sx={{
          marginTop: 2,
          borderRadius: 5,
          background: 'black',
          padding: '5px 40px',
          color: 'white',

          '&: hover': {
            color: 'black',
            border: '1px solid black',
            padding: '4px 39px',
          },
        }}
        onClick={handleForm}
      >
        Додати
      </Button>
    </Box>
  );
};

Admin.getInitialProps = async (ctx: any) => {
  const {query} = ctx;
  const res = await axios.get(`${API_URL}/internet?userId=1`);
  console.log('resres', res);

  return {providers: res};
};

export default Admin;
