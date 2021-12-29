import { useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

//
const useCheckToken = (): void => {
  axios
    .post('/token/refresh', {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsanM5ODExMjBAZ21haWwuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY0MDU5OTk0Nn0.AylO0by_TMhvNS1aZknovssVITNZwTqqgk3_RX2x9eEvKQut2gulQ1nJhs0huyA71QWPRsBtZvdszgUaOrxt2w`,
      },
    })
    .then((response) => {
      localStorage.setItem('refresh-token', response.data.accessToken);
      localStorage.setItem('refresh-token', response.data.refreshToken);
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default useCheckToken;
