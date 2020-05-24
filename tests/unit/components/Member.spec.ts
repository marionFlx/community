import { mount } from '@vue/test-utils';
import Member from '@/components/Member.vue';

describe('Member.vue', () => {
  test('should display a member name and its interests', () => {
    const memberModel = {
      id: 12,
      name: 'Mathias',
      interests: [
        { id: 1, label: 'Netflix' },
        { id: 2, label: 'Chill' },
        { id: 3, label: 'Cuisine' }
      ],
      signupDate: '2016-02-18T08:02:00Z'
    };

    const wrapper = mount(Member, {
      props: {
        memberModel
      }
    });

    // You need an h2 element for the member name
    const memberName = wrapper.get('h2');
    // The h2 element should contain the member name
    expect(memberName.text()).toContain('Mathias');
    const signupDate = wrapper.get('p');
    // The p element should contain the signupDate instant transformed by the fromNow function
    expect(signupDate.text()).toContain('ago');
    const interests = wrapper.findAll('li');
    // You should have one li elements per interest
    expect(interests).toHaveLength(3);
    expect(interests[0].text()).toContain('Netflix');
    expect(interests[1].text()).toContain('Chill');
    expect(interests[2].text()).toContain('Cuisine');
  });
});
