import "dotenv/config";

import { CAPABILITY_IDS, ROLE_IDS } from "./constants";
import { db } from "./index";
import { capabilities, roleCapabilities, roles } from "./schema";

async function seed() {
  console.warn("Seeding roles...");
  await db
    .insert(roles)
    .values([
      {
        id: ROLE_IDS.admin,
        name: "admin",
        description: "Full access to organization",
      },
      {
        id: ROLE_IDS.member,
        name: "member",
        description: "Basic access to organization",
      },
    ])
    .onConflictDoNothing();

  console.warn("Seeding capabilities...");
  await db
    .insert(capabilities)
    .values([
      {
        id: CAPABILITY_IDS.orgManage,
        name: "org:manage",
        description: "Manage organization settings",
      },
      {
        id: CAPABILITY_IDS.orgDelete,
        name: "org:delete",
        description: "Delete organization",
      },
      {
        id: CAPABILITY_IDS.membersInvite,
        name: "members:invite",
        description: "Invite new members",
      },
      {
        id: CAPABILITY_IDS.membersRemove,
        name: "members:remove",
        description: "Remove members",
      },
      {
        id: CAPABILITY_IDS.membersManageRoles,
        name: "members:manage_roles",
        description: "Change member roles",
      },
    ])
    .onConflictDoNothing();

  console.warn("Seeding role-capability mappings...");
  // Admin gets all capabilities
  await db
    .insert(roleCapabilities)
    .values([
      { roleId: ROLE_IDS.admin, capabilityId: CAPABILITY_IDS.orgManage },
      { roleId: ROLE_IDS.admin, capabilityId: CAPABILITY_IDS.orgDelete },
      { roleId: ROLE_IDS.admin, capabilityId: CAPABILITY_IDS.membersInvite },
      { roleId: ROLE_IDS.admin, capabilityId: CAPABILITY_IDS.membersRemove },
      { roleId: ROLE_IDS.admin, capabilityId: CAPABILITY_IDS.membersManageRoles },
    ])
    .onConflictDoNothing();
  // Member gets no capabilities (view-only)

  console.warn("Seeding complete!");
}

seed()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
