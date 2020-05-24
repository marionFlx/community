import { useMemberService } from '@/composables/MemberService';

describe('useMemberService', () => {
  test('should list members', async () => {
    const memberService = useMemberService();
    const members = await memberService.list();
    // It should return 4 members for the `list()` function
    expect(members).toHaveLength(4);
    // The member should include the interests
    expect(members[0].interests).toHaveLength(3);
  });
});
