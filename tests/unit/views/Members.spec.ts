import { mount } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';
import Members from '@/views/Members.vue';
import { MemberModel } from '@/models/MemberModel';

const mockMemberService = {
  list: jest.fn()
};
jest.mock('@/composables/MemberService', () => ({
  useMemberService: () => mockMemberService
}));

const AsyncWrapper = defineComponent({
  components: { Members },
  template: `<Suspense><Members/></Suspense>`
});

describe('Members.vue', () => {
  test('should display every member name in a title', async () => {
    mockMemberService.list.mockReturnValue([{ name: 'Mathias' }, { name: 'Olivier' }] as Array<MemberModel>);
    const asyncWrapper = mount(AsyncWrapper);
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();

    expect(asyncWrapper.html()).toContain('Mathias');
    expect(asyncWrapper.html()).toContain('Olivier');

    /*
    TODO findComponent does not work inside Suspense
    const wrapper = asyncWrapper.findComponent(Members);
    // You need to have a field `mambers` initialized with 2 members
    const membersField = wrapper.vm.members;
    expect(memberField).not.toBeUndefined();
    // You need to have a field `races` initialized with 2 races
    expect(membersField).toHaveLength(2);
    expect(membersField[0].name).toBe('Mathias');
    expect(membersField[1].name).toBe('Olivier');

    const memberComponents = wrapper.findAllComponents(Member);
    // You should have a `Member` component per member in your template
    expect(memberComponents).toHaveLength(2);*/
  });
});
