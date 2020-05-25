import axios, { AxiosResponse } from 'axios';
import { useUserService } from '@/composables/UserService';
import { UserModel } from '@/models/UserModel';

const userModel: UserModel = {
  email: 'marion@maplr.co',
  password: ''
};

describe('useUserService', () => {
  test('should register a user', async () => {
    jest.spyOn(axios, 'post').mockResolvedValue({ data: userModel } as AxiosResponse<UserModel>);

    const formValues = {
      email: 'marion@maplr.co',
      password: 'password'
    };

    const userService = useUserService();
    const userReceived = await userService.register(formValues);

    // It should post the user to the API
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3007/users', formValues);
    // It should return a user for the `register` function
    expect(userReceived).toBe(userModel);
  });
});
