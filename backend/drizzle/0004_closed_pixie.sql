CREATE TABLE "user_voyages" (
	"user_id" integer NOT NULL,
	"voyage_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "voyages" (
	"voyage_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "voyages_voyage_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"description" text,
	"image_url" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "federated_credentials" DROP CONSTRAINT "federated_credentials_federated_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "federated_credentials" ADD COLUMN "user_id" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "firstname" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "lastname" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "github_url" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "deletedAt" timestamp;--> statement-breakpoint
ALTER TABLE "user_voyages" ADD CONSTRAINT "user_voyages_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_voyages" ADD CONSTRAINT "user_voyages_voyage_id_voyages_voyage_id_fk" FOREIGN KEY ("voyage_id") REFERENCES "public"."voyages"("voyage_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "federated_credentials" ADD CONSTRAINT "federated_credentials_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "federated_credentials" DROP COLUMN "federated_user_id";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "deleted_at";