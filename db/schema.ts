import { boolean, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["user", "admin", "moderator"]);

export const users = pgTable("users", {
  id: text("id").primaryKey().unique(),
  name: text("name"),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),

  role: roleEnum("role").default("user"),

  isActive: boolean("is_active").default(true),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
