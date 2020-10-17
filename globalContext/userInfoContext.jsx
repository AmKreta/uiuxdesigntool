import React from 'react';

const UserInfoContext = React.createContext({ userId: null, userName: 'guest' });

export default UserInfoContext;