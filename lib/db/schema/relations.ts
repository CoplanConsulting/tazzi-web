import { relations } from "drizzle-orm";

import { capabilities } from "./capabilities";
import { days } from "./days";
import { orgUsers } from "./org-users";
import { orgs } from "./orgs";
import { roleCapabilities } from "./role-capabilities";
import { roles } from "./roles";
import { tours } from "./tours";

// Org relations
export const orgsRelations = relations(orgs, ({ many }) => ({
  orgUsers: many(orgUsers),
  tours: many(tours),
}));

// Role relations
export const rolesRelations = relations(roles, ({ many }) => ({
  roleCapabilities: many(roleCapabilities),
  orgUsers: many(orgUsers),
}));

// Capability relations
export const capabilitiesRelations = relations(capabilities, ({ many }) => ({
  roleCapabilities: many(roleCapabilities),
}));

// RoleCapability relations (junction table)
export const roleCapabilitiesRelations = relations(roleCapabilities, ({ one }) => ({
  role: one(roles, {
    fields: [roleCapabilities.roleId],
    references: [roles.id],
  }),
  capability: one(capabilities, {
    fields: [roleCapabilities.capabilityId],
    references: [capabilities.id],
  }),
}));

// OrgUser relations
export const orgUsersRelations = relations(orgUsers, ({ one }) => ({
  org: one(orgs, {
    fields: [orgUsers.orgId],
    references: [orgs.id],
  }),
  role: one(roles, {
    fields: [orgUsers.roleId],
    references: [roles.id],
  }),
}));

// Tour relations
export const toursRelations = relations(tours, ({ one, many }) => ({
  org: one(orgs, {
    fields: [tours.orgId],
    references: [orgs.id],
  }),
  days: many(days),
}));

// Day relations
export const daysRelations = relations(days, ({ one }) => ({
  tour: one(tours, {
    fields: [days.tourId],
    references: [tours.id],
  }),
  // Future relations (uncomment when tables exist):
  // events: many(events),
  // travelItineraries: many(travelItineraries),
}));
