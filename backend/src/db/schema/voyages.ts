import { integer, pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const voyages = pgTable("voyages", {
  voyageId: integer("voyage_id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
