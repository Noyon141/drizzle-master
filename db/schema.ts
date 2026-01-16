import { pgTable, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey().unique(),
  name: text("name"),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});
