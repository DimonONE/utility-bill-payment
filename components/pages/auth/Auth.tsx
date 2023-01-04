import React, {useCallback, useState} from 'react';
import {NextPage} from 'next';
import {API_URL} from '../../config';
import axios from 'axios';
import {
  Typography,
  InputLabel,
  Input,
  FormHelperText,
  FormControl,
  Box,
  Button,
} from '@mui/material';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {useGlobalState} from '@root/context/state';

type IProps = {
  test: any;
};

const Auth: React.FC<IProps> = props => {
  const {pathname, ...router} = useRouter();
  const [, setUserId] = useGlobalState('userId');
  const [, setUserName] = useGlobalState('userName');

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
  });

  const isAuth = pathname === '/auth';
  const isValidPassword =
    !!data.password &&
    !!data.passwordRepeat &&
    data.password === data.passwordRepeat;

  const isValidReg = useCallback(
    () => !!data.email || !!data.email || !isValidPassword,
    [data]
  );

  const isValidAuth = useCallback(
    () => !!data.email && !!data.password,
    [data]
  );

  const handleForm = async () => {
    if (!!data.email) {
      let res;

      if (isAuth) {
        res = await axios.post(`${API_URL}/userAuth`, {
          email: data.email,
          password: data.password,
        });
      } else {
        res = await axios.post(`${API_URL}/user`, {
          ...data,
        });
      }
      if (res.status) {
        const {_id, name} = res.data.data;
        setUserId(_id);
        setUserName(name);

        localStorage.setItem('userId', _id);
        localStorage.setItem('userName', name);

        router.push(`/internet?userId=${_id}`);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {id, value} = event.target;
    setData(prev => ({...prev, [id]: value}));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
      }}
    >
      <Typography
        fontSize={20}
        marginBottom={5}
        width={'max-content'}
        textTransform="uppercase"
      >
        {isAuth ? 'Вхід' : 'РЕЄСТРАЦІЯ'}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {!isAuth ? (
          <FormControl sx={{margin: '10px 0', maxWidth: '300px'}}>
            <InputLabel htmlFor="my-name">{"Ім'я"}</InputLabel>
            <Input
              id="name"
              value={data.name}
              onChange={handleChange}
              aria-describedby="my-helper-text"
            />
            <FormHelperText id="my-helper-text">
              Введіть ваше {"ім'я"}.
            </FormHelperText>
          </FormControl>
        ) : null}

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
            type="password"
            onChange={handleChange}
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">
            Введіть ваш password.
          </FormHelperText>
        </FormControl>
        {!isAuth ? (
          <FormControl sx={{margin: '10px 0', maxWidth: '300px'}}>
            <InputLabel htmlFor="my-password">Повторіть пароль</InputLabel>
            <Input
              id="passwordRepeat"
              type="password"
              onChange={handleChange}
              error={!isValidPassword}
              aria-describedby="my-helper-text"
            />
            <FormHelperText id="my-helper-text">
              Введіть ваш password повторно.
            </FormHelperText>
          </FormControl>
        ) : null}
      </Box>

      <Box sx={{margin: 3}}>
        <Link href={isAuth ? '/reg' : '/auth'}>
          {isAuth ? 'Створити нового користувача' : 'Вже є аккаунт?'}
        </Link>
      </Box>

      <Button
        sx={{
          marginTop: 2,
          borderRadius: 5,
          background: 'black',
          padding: '10px 40px',
          color: 'white',
          transition: '.7s background',

          '&: hover': {
            color: 'black',
            border: '1px solid black',
            padding: '9px 39px',
          },
          '&.Mui-disabled': {
            background: '#ede8e8',
          },
        }}
        onClick={handleForm}
        disabled={isAuth ? !isValidAuth() : !isValidReg()}
      >
        {isAuth ? 'Увійти' : 'Створити'}
      </Button>
    </Box>
  );
};

export default Auth;
