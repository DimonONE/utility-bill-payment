import React, {useState, useEffect} from 'react';
import {FormControl, Input} from '@mui/material';
import {NextPage} from 'next';
import {API_URL} from '../../config';
import axios from 'axios';
import {
  Typography,
  TextField,
  FormHelperText,
  Box,
  Button,
} from '@mui/material';
import InputMask from 'react-input-mask';

import {useGlobalState} from '@root/context/state';
import {useRouter} from 'next/router';

type IProps = {
  userInfo: any;
};

const Payment: NextPage<IProps> = ({userInfo}) => {
  const [userId] = useGlobalState('userId');
  const [userName] = useGlobalState('userName');
  const {push} = useRouter();

  const [data, setData] = useState({
    price: '',
    provider: 'Starlinck',
  });

  const handleForm = async () => {
    const res = await axios.post(`${API_URL}/internet`, {
      ...data,
      userId,
      userName,
    });

    if (res.status === 200) push(`/internet?userId=${userId}`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {id, value} = event.target;

    if (id === 'price') {
      setData(prev => ({...prev, price: value}));
    } else setData(prev => ({...prev, [id]: value}));
  };

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Typography
        fontSize={20}
        marginBottom={5}
        width={'max-content'}
        textTransform="uppercase"
      >
        Оплата
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <FormControl sx={{margin: '10px 0', maxWidth: '300px'}}>
          {/* <Input
            id="price"
            value={data.price}
            onChange={handleChange}
            type="number"
            aria-describedby="my-helper-text"
          /> */}

          <TextField
            id="price"
            value={data.price}
            onChange={handleChange}
            aria-describedby="my-helper-text"
            placeholder="0 грн"
          />
          <FormHelperText id="my-helper-text">Введіть суму.</FormHelperText>
        </FormControl>
        {/* <FormControl sx={{margin: '10px 0', maxWidth: '300px'}}>
          <InputLabel htmlFor="my-password2">Послуга</InputLabel>
          <Input
            id="provider"
            onChange={handleChange}
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">Оберіть послугу.</FormHelperText>
        </FormControl> */}
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
        Оплатити
      </Button>
    </Box>
  );
};

export default Payment;
