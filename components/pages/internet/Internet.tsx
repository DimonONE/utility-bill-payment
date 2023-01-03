import React, {useMemo} from 'react';
import BasicTable from '@root/components/basicTable/BasicTable';
import {NextPage} from 'next';
import {API_URL} from '../../config';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import dayjs from 'dayjs';

type InternetUser = {
  userName: string;
  price: string | number;
  email: string;
  password: string;
  provider: string;
  userId: string | number;
  date: string;
};

type IProps = {
  data: InternetUser[] & {success?: boolean};
};

function createData({
  userName,
  provider,
  price,
  date,
}: Pick<InternetUser, 'provider' | 'userName' | 'price' | 'date'>) {
  return {userName, provider, price, date};
}

const columns = [
  {key: 1, name: 'Логін'},
  {key: 2, name: 'Провайдер'},
  {key: 3, name: 'Ціна'},
  {key: 4, name: 'Дата'},
];

const Interten: NextPage<IProps> = ({data}) => {
  console.log('data', data);

  if (!data.length) return null;

  const rows = useMemo(() => {
    return data.map(
      ({userName, price, email, password, provider, userId, date}) =>
        createData({
          userName,
          provider,
          price: `${price} грн`,
          date: dayjs(date).format('HH:mm - DD/MM/YYYY'),
        })
    );
  }, [data]);

  return (
    <Box>
      <Typography fontSize={20} marginBottom={5}>
        Історія оплат
      </Typography>

      <BasicTable columns={columns} rows={rows} />
    </Box>
  );
};

Interten.getInitialProps = async (ctx: any) => {
  const {query} = ctx;
  const res = await axios.get(`${API_URL}/internet?userId=${query?.userId}`);

  return {data: [res.data.data][0]};
};

export default Interten;
