import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Register from '@/views/Register.vue';
import { UserModel } from '@/models/UserModel';
import { createRouter, createWebHistory } from 'vue-router';

const mockUserService = {
  register: jest.fn()
};
jest.mock('@/composables/UserService', () => ({
  useUserService: () => mockUserService
}));

const mockRouter = createRouter({ history: createWebHistory(), routes: [] });

function registerWrapper() {
  return mount(Register, {
    global: {
      plugins: [mockRouter]
    }
  });
}

describe('Register.vue', () => {
  test('should have a userModel property', () => {
    const wrapper = registerWrapper();
    // The component should have a `userModel` property initialized with default values
    const userModel = wrapper.vm.userModel;
    expect(userModel).not.toBeNull();
    expect(userModel.email).toBe('');
    expect(userModel.password).toBe('');
  });

  test('should have an errors computed property', () => {
    const wrapper = registerWrapper();
    wrapper.vm.userModel.email = 'marion@maplr.co';
    // The component should have a computed property `errors`
    const errors = wrapper.vm.errors;
    expect(errors.email).toBeFalsy();
    expect(errors.password).toBeTruthy();

    wrapper.vm.userModel.email = '';
    wrapper.vm.userModel.password = 'pwd';
    const errorsUpdated = wrapper.vm.errors;
    expect(errorsUpdated.email).toBeTruthy();
    expect(errorsUpdated.password).toBeFalsy();
  });

  test('should display a form', () => {
    const wrapper = registerWrapper();

    // The template should display an input for the login
    expect(wrapper.find('input').exists()).toBeTruthy();
    // The template should display an input of type password for the password
    expect(wrapper.find('input[type=password]').exists()).toBeTruthy();

    // The template should display a submit button
    const button = wrapper.get('button');
    // Your submit button should be disabled if the form is invalid
    expect(button.attributes('disabled')).not.toBeNull();
  });

  test('should update the dirtiness of a field', () => {
    const wrapper = registerWrapper();

    // The component should have a `dirty` property
    const dirty = wrapper.vm.dirty;
    expect(dirty.email).toBeFalsy();
    expect(dirty.password).toBeFalsy();

    wrapper.get('input').trigger('input');
    // The login field should be dirty after the input event
    expect(dirty.email).toBeTruthy();
    dirty.email = false;
    wrapper.get('input').trigger('input');
    // The input event listener for the email field should be executed only once by using `@input.once`
    expect(dirty.email).toBeFalsy();

    wrapper.get('input[type=password]').trigger('input');
    // The password field should be dirty after the input event
    expect(dirty.password).toBeTruthy();
    dirty.password = false;
    wrapper.get('input[type=password]').trigger('input');
    // The input event listener for the password field should be executed only once by using `@input.once`
    expect(dirty.password).toBeFalsy();
  });

  test('should display errors for login', async () => {
    const wrapper = registerWrapper();

    const emailInput = wrapper.get('input');
    // The login input should not have the CSS class is-invalid when not dirty
    expect(emailInput.classes()).not.toContain('is-invalid');
    // The login field error should not be displayed when not dirty
    expect(wrapper.find('.invalid-feedback').exists()).toBeFalsy();
    // The login label should not have the CSS class text-danger when not dirty
    const label = wrapper.findAll('label')[0];
    expect(label.classes()).not.toContain('text-danger');

    await emailInput.setValue('marion@maplr.co');
    await emailInput.setValue('');
    // The login field should display an error
    const loginError = wrapper.get('.invalid-feedback');
    expect(loginError.exists()).toBeTruthy();
    expect(loginError.text()).toContain('Email is required');
    // The login input should have the CSS class is-invalid when in error
    expect(emailInput.classes()).toContain('is-invalid');
    // The login label should have the CSS class text-danger when in error
    expect(label.classes()).toContain('text-danger');

    await emailInput.setValue('marion@maplr.co');
    // The login field error should not be displayed
    expect(wrapper.find('.invalid-feedback').exists()).toBeFalsy();
    // The login input should not have the CSS class is-invalid when not in error
    expect(emailInput.classes()).not.toContain('is-invalid');
    // The login label should not have the CSS class text-danger when not in error
    expect(label.classes()).not.toContain('text-danger');
    // The field should be linked to the userModel.login value
    expect(wrapper.vm.userModel.email).toBe('marion@maplr.co');
  });

  test('should display errors for password', async () => {
    const wrapper = registerWrapper();

    const passwordInput = wrapper.get('input[type=password]');
    // The password input should not have the CSS class is-invalid when not dirty
    expect(passwordInput.classes()).not.toContain('is-invalid');
    // The password field error should not be displayed when not dirty
    expect(wrapper.find('.invalid-feedback').exists()).toBeFalsy();
    // The password label should not have the CSS class text-danger when not dirty
    const label = wrapper.findAll('label')[1];
    expect(label.classes()).not.toContain('text-danger');

    await passwordInput.setValue('password');
    await passwordInput.setValue('');
    // The password field should display an error
    const passwordError = wrapper.get('.invalid-feedback');
    expect(passwordError.text()).toContain('The password is required');
    // The password input should have the CSS class is-invalid when in error
    expect(passwordInput.classes()).toContain('is-invalid');
    // The password label should have the CSS class text-danger when in error
    expect(label.classes()).toContain('text-danger');

    await passwordInput.setValue('password');
    // The password field error should not be displayed
    expect(wrapper.find('.invalid-feedback').exists()).toBeFalsy();
    // The password input should not have the CSS class is-invalid when not in error
    expect(passwordInput.classes()).not.toContain('is-invalid');
    // The password label should not have the CSS class text-danger when not in error
    expect(label.classes()).not.toContain('text-danger');
    // The field should be linked to the userModel.password value
    expect(wrapper.vm.userModel.password).toBe('password');
  });

  test('should call the register function on submit', async () => {
    mockUserService.register.mockResolvedValue({} as UserModel);
    const wrapper = registerWrapper();
    jest.spyOn(mockRouter, 'push').mockResolvedValue();

    // You should have a `form` element
    const form = wrapper.get('form');
    await form.trigger('submit');
    // You may have forgot the submit handler on the `form` element
    // or to call the `register` function in the submit handler
    expect(mockUserService.register).toHaveBeenCalled();
    await nextTick();
    await nextTick();
    await nextTick();
    // It should redirect to home after a submission success
    expect(mockRouter.push).toHaveBeenCalled();

    const alert = wrapper.find('#registration-error');
    // An alert should not be displayed on registration success
    expect(alert.exists()).toBeFalsy();
  });

  test('should display an alert on submission failure', async () => {
    mockUserService.register.mockRejectedValue(null);
    const wrapper = registerWrapper();
    jest.spyOn(mockRouter, 'push').mockResolvedValue();

    // You should have a `form` element
    const form = wrapper.get('form');
    await form.trigger('submit');
    // You may have forgot the submit handler on the `form` element
    // or to call the `register` function in the submit handler
    expect(mockUserService.register).toHaveBeenCalled();
    await nextTick();
    await nextTick();
    await nextTick();
    // It should not redirect to home after a submission failure
    expect(mockRouter.push).not.toHaveBeenCalled();

    const alert = wrapper.find('#registration-error');
    // An alert should be displayed on registration failure
    expect(alert.exists()).toBeTruthy();

    const closeButton = alert.get('button');
    await closeButton.trigger('click');
    // The alert should be closable
    expect(wrapper.find('#registration-error').exists()).toBeFalsy();
  });
});
