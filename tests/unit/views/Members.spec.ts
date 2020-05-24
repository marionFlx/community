import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Members from '@/views/Members.vue';
import Member from '@/components/Member.vue';
import { MemberModel } from '@/models/MemberModel';

const mockMemberService = {
  list: jest.fn()
};
jest.mock('@/composables/MemberService', () => ({
  useMemberService: () => mockMemberService
}));

describe('Members.vue', () => {
  test('should display every member name in a title', async () => {
    mockMemberService.list.mockReturnValue([{ name: 'Mathias' }, { name: 'Olivier' }] as Array<MemberModel>);
    const wrapper = mount(Members);
    await nextTick();
    await nextTick();

    // You need to have a field `members` initialized with 2 members
    const membersField = wrapper.vm.members;
    expect(membersField).not.toBeUndefined();
    // You need to have a field `members` initialized with 2 members
    expect(membersField).toHaveLength(2);
    expect(membersField[0].name).toBe('Mathias');
    expect(membersField[1].name).toBe('Olivier');

    const memberComponents = wrapper.findAllComponents(Member);
    // You should have a `Member` component per member in your template
    expect(memberComponents).toHaveLength(2);
  });
});
