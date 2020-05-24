import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Members from '@/views/Members.vue';
import Member from '@/components/Member.vue';

describe('Members.vue', () => {
  test('should display every member name in a title', async () => {
    const wrapper = mount(Members);
    await nextTick();

    // You need to have a field `members` initialized with 4 members
    const membersField = wrapper.vm.members;
    expect(membersField).not.toBeUndefined();
    // You need to have a field `members` initialized with 4 members
    expect(membersField).toHaveLength(4);
    expect(membersField[0].name).toBe('Julien');
    expect(membersField[1].name).toBe('Pierre');
    expect(membersField[2].name).toBe('Alexandre');
    expect(membersField[3].name).toBe('Marion');

    const memberNames = wrapper.findAll('h2');
    // You should have an `h2` element per member in your template
    expect(memberNames).toHaveLength(4);
    expect(membersField[0].name).toBe('Julien');
    expect(membersField[1].name).toBe('Pierre');
    expect(membersField[2].name).toBe('Alexandre');
    expect(membersField[3].name).toBe('Marion');

    const memberComponents = wrapper.findAllComponents(Member);
    // You should have a `Race` component per race in your template
    expect(memberComponents).toHaveLength(4);
  });
});
