import { integer, pgTable } from "drizzle-orm/pg-core";
import { users } from "./user";
import { voyages } from "./voyages";

export const userVoyages = pgTable("user_voyages", {
  userId: integer("user_id").references(() => users.userId).notNull(),
  voyageId: integer("voyage_id").references(() => voyages.voyageId).notNull()
});
