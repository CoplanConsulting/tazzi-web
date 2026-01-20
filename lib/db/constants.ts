// Hardcoded UUIDs for consistent seeding and lookups
export const ROLE_IDS = {
  admin: "00000000-0000-0000-0000-000000000001",
  member: "00000000-0000-0000-0000-000000000002",
} as const;

export const CAPABILITY_IDS = {
  orgManage: "00000000-0000-0000-0001-000000000001",
  orgDelete: "00000000-0000-0000-0001-000000000002",
  membersInvite: "00000000-0000-0000-0001-000000000003",
  membersRemove: "00000000-0000-0000-0001-000000000004",
  membersManageRoles: "00000000-0000-0000-0001-000000000005",
} as const;
